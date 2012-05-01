define( [
	'require',
	'jquery',
	'underscore',
	'appcontext',
	'devicecontext',
	'collections/locationcollection',
	'collections/productcollection',
	'collections/skucollection',
	'collections/tweetcollection',
],
function( 
	require,
	$,
	_,
	appcontext,
	devicecontext,
	LocationCollection,
	ProductCollection,
	SKUCollection,
	TweetCollection
) {
	"use strict";
	
	var AppController = {};
	
	var cachedUtils = null;
	var getUtils = function() {
		if (cachedUtils == null) {
			cachedUtils = require("uiutils");
		}
		
		return cachedUtils;
	};
	
	var cachedCollections = null;
	var getCollections = function() {
		if (cachedCollections == null) {
			cachedCollections = require("collections/collections");
		}
		
		return cachedCollections;
	};
	
	
	AppController.getPage = function(options) {	
		options || (options = {});
		
		var pageKey = ("key" in options ? options.key : null),
			pageId = ("pageid" in options ? options.pageid : null),
			updateView,
			page,
			utils = getUtils(),
			collections = getCollections();
		
		var renderView = function(page) {
			var jQMPage = pageKey == "home"
							? "#"
							: "page.html#pages/" + pageId;
			
			//TODO This needs refactored to make it cleaner	
			//Need to decide if want the index.html (for home page) or page.html for any other types of pages
			if (pageId != null) {
				options.pagecreate = function(e) {
					utils.setPageNavBar("page", "general");
				};
				
				options.pageinit = function(e) {
					utils.updateBackboneRoute("pages/" + pageId, options);
					utils.updateBackbonePage("getPage", page);
				};
				
				utils.updatejQMPage(jQMPage, options);
			} else {
				//TODO jQMPage can be either "#" or "#home" but jQM doesn't change to that page, only 
				//seems to work when using the full path that the app is running on...
				var jQMPagePath = appcontext.contextRoot + "/";
				
				//Ensure the route won't trigger, as we will have the home page in DOM already as it's the entry point
				options.trigger = false;
				
				utils.updatejQMPage(jQMPagePath, options); 	
				utils.setPageNavBar("page", "general");
					
				utils.updateBackboneRoute(jQMPage, options);
				utils.updateBackbonePage("getPage", page, {
					pageSelector: "#home .content",
					templateSelector: "#home-body",	
				});
			}
		};
		
		var getPageModel = function() {
			return pageKey != null 
					? collections.pages.getByKey("key", pageKey) 
					: collections.pages.get(pageId);
		};
		
	
		if (collections.pages != null && collections.pages.length > 0) {
			page = getPageModel();
			renderView(page);
		} else {
			collections.pages.fetch();
			
			collections.pages.bind("reset", function updateView() {
				page = getPageModel();
				renderView(page);
				collections.pages.unbind("reset", updateView);
			});
		}
	};
		
		
	AppController.getProductsList = function(options) {
		options || (options = {});
		var utils = getUtils();	
		
		var renderView = function(products) {
			//We have successful view, so null the last selection
			appcontext.lastProductSelected = null;
			
			//We have all the pieces here, before rendering the view, check if we have only one item for the list
			if (products.length == 1) {
				//There is only one product, skip this page
				var product = products.at(0);
				
				//persist the options product that was passed, as it might have page transition info in it
				options.productid = product.get("id");
				
				if ("options" in arguments && "callback" in options) {
					options.callback(options);
				} else {
					AppController.getProductDetail(options);
				}
			} else {
				options.pagecreate = function() {
					utils.setPageNavBar("products", "general");
				};
				
				options.pageinit = function() {
					utils.updateBackboneRoute("#products", options);
					utils.updateBackbonePage("listProducts", products, {
						selectItem: AppController.getProductDetail,
					});
				};
				
				utils.updatejQMPage("productlist.html#products", options);
			}
		};
		
		getCollections().products.fetch(renderView);
	};
		
		
	AppController.getProductDetail = function(options) {
		options || (options = {});
		
		var utils = getUtils();	
			
		//Callback to render the view for this list of locations
		var renderView = function(product) {			
			//We have successful view, so set the last selection
			appcontext.lastProductSelected = product;
			
			options.pagecreate = function(e) {
				utils.setPageNavBar("product", "product");
			};
			
			options.pageinit = function(e) {
				utils.updateBackboneRoute("#products/" + product.get("id"), options);
				utils.updateBackbonePage("productDetail", product);
				utils.customizePageTitle(product.get("name"));
			};
			
			utils.updatejQMPage("productdetail.html#product", options);
		};
		
		//Callback to get all the locations that are a child of this country
		var getRelated = function(product) {
			product.fetchChildren("skus", "productId", getCollections().skus, SKUCollection, renderView);
		};
		
		getCollections().products.get(options.productid, getRelated);
	};
	
	
	AppController.getProductCountryList = function(options) {	
		var utils = getUtils();
		options || (options = {});
		
		var thisProduct = null;
			
		//Callback to get all the locations that are a child of this country
		var renderProductCountries = function(countries) {
			appcontext.lastProductSelected = thisProduct;
			
			//if there is only one country, just fwd on the view to the next step
			if (countries.length == 1) {
				AppController.getProductCountryLocationList({countryid: countries.at(0).get("id")});
			} else {
				options.pagecreate = function(e) {
					utils.setPageNavBar("countries", "product");
				};
				
				options.pageinit = function(e) {
					utils.updateBackboneRoute("#products/" + thisProduct.get("id") + "/countries", options);
					utils.updateBackbonePage("listCountries", countries, {
						selectItem: AppController.getProductCountryLocationList,
					});
					utils.customizePageTitle("Product Countries");
				};
				
				utils.updatejQMPage("countrylist.html#countries", options);
			}
		};
		
		
		//Callback to get all the locations that are a child of this country
		var renderProductCountriesByLocations = function(countries) {
			appcontext.lastProductSelected = thisProduct;
			
			alert("not implemented - product with limited availability");
		};
		
		//Callback to get all the locations that are a child of this country
		var processProduct = function(product) {
			thisProduct = product;
			
			//Check to see if this is a widely available product, or it's specific locations
			if (product.get("availableEverywhere")) {
				//Easy, just show the whole location list
				getCollections().countries.fetch(renderProductCountries);
			} else {
				//Need to get the locations, then only the countries from within that list and show them
				//TODO Don't have a product yet that has limited availability :)
				alert("not implemented - product with limited availability");
				
				//TODO NOT TESTED
				product.fetchChildren("locations", "productId", getCollections().productlocations, LocationCollection, renderProductCountriesByLocations);
			}
		};
		
		getCollections().products.get(options.productid, processProduct);
	};
	
	
	AppController.getProductCountryLocationList = function(options) {	
		var thisProduct = null;
		var thisCountry = null;
		var utils = getUtils();
		
		//Callback to render the view for this list of locations
		var renderViewFromCountry = function(country) {			
			//We have successful view, so null the last selection
			appcontext.lastProductSelected = thisProduct;
			appcontext.lastLocationSelected = null;
			
			options.pagecreate = function(e) {
				utils.setPageNavBar("locations", "product");
			};
			
			options.pageinit = function(e) {
				utils.updateBackboneRoute("#products/" + thisProduct.get("id") + "/countries/" + thisCountry.get("id") + "/locations", options);
				utils.updateBackbonePage("listLocations", country.get("locations"), {
					selectItem: AppController.getLocationDetail,
				});
				utils.customizePageTitle(country.get("name"));
			};
			
			utils.updatejQMPage("locationlist.html#locations", options);
		};
		
		//Callback to get all the locations that are a child of this country
		var filterLocationsByCountry = function(country) {
			//TODO Don't have a product yet that has limited availability :)
			alert("not implemented - product with limited availability");
			
			//Where to store the filtered productLocations?
		};
		
		//Callback to get all the locations that are a child of this country/product
		var getProductLocations = function(country) {
			thisCountry = country;
			
			//Check to see if this is a widely available product, or it's specific locations
			if (thisProduct.get("availableEverywhere")) {
				//Easy, just show the whole location list
				thisCountry.fetchChildren("locations", "countryId", getCollections().locations, LocationCollection, renderViewFromCountry);
			} else {
				//TODO Don't have a product yet that has limited availability :)
				alert("not implemented - product with limited availability");
				
				thisCountry = country;
				thisProduct.fetchChildren("locations", "productId", getCollections().productLocations, LocationCollection, filterLocationsByCountry);
			}
		};
		
		//Callback to get the country detail
		var getCountryDetail = function(product) {
			thisProduct = product;
			getCollections().countries.get(options.countryid, getProductLocations);
		};
		
		//The product can be gotten either from the lastSelectedProduct, or via the options.productid
		if ("productid" in options) {
			getCollections().products.get(options.productid, getCountryDetail);
		} else if (appcontext.lastProductSelected != null) {
			getCountryDetail(appcontext.lastProductSelected);
		} else {
			//TODO better exception handling
			throw "error - could not determine product from the context the application was in";	
		}
	};	
	
	
	AppController.getProductLocationNearest = function(options) {
		options || (options = {});
		
		alert("not implemented yet");
	};
			
		
	AppController.getCountriesList = function(options) {	
		options || (options = {});
		var utils = getUtils();
			
		var renderView = function(countries) {
			//We have successful view, so null the last selection
			appcontext.lastLocationSelected = null;
			
			//We have all the pieces here, before rendering the view, check if we have only one item for the list
			if (countries.length == 1) {
				//There is only one item, skip this page
				var country = countries.at(0);
				
				//persist the options product that was passed, as it might have page transition info in it
				options.countryid = country.get("id");
				
				if ("options" in arguments && "callback" in options) {
					options.callback(options);
				} else {
					AppController.getCountryLocationList(options);
				}
			} else {
				options.pagecreate = function(e) {
					utils.setPageNavBar("countries", "general");
				};
				
				options.pageinit = function(e) {
					utils.updateBackboneRoute("#countries", options);
					utils.updateBackbonePage("listCountries", countries, {
						selectItem: AppController.getCountryLocationList,
					});
				};
				
				utils.updatejQMPage("countrylist.html#countries", options);
			}
		};
		
		getCollections().countries.fetch(renderView);
	};
	
	
	AppController.getCountryLocationList = function(options) {	
		options || (options = {});
		var utils = getUtils();
		
		//Callback to render the view for this list of locations
		var renderView = function(country) {			
			//We have successful view, so null the last selection
			appcontext.lastLocationSelected = null;
			
			options.pagecreate = function(e) {
				utils.setPageNavBar("locations", "general");
			};
			
			options.pageinit = function(e) {
				utils.updateBackboneRoute("#countries/" + country.get("id") + "/locations", options);
				utils.updateBackbonePage("listLocations", country.get("locations"), {
					selectItem: AppController.getLocationDetail,
				});
				utils.customizePageTitle(country.get("name"));
			};
			
			getUtils().updatejQMPage("locationlist.html#locations", options);
		};
		
		//Callback to get all the locations that are a child of this country
		var getRelated = function(country) {
			country.fetchChildren("locations", "countryId", getCollections().locations, LocationCollection, renderView);
		};
		
		getCollections().countries.get(options.countryid, getRelated);
	};
	
	
	AppController.getLocationDetail = function(options) {	
		options || (options = {});
		var utils = getUtils();
			
		var renderView = function(location) {
			//We have successful view, so null the last selection
			appcontext.lastLocationSelected = location;
			
			options.pagecreate = function(e) {
				utils.setPageNavBar("location", "location");
			};
			
			options.pageinit = function(e) {
				utils.updateBackboneRoute("#locations/" + location.get("id"), options);
				utils.updateBackbonePage("locationDetail", location, {
					viewLocationMap: AppController.getLocationOnMap,
					callLocationPhone: AppController.getLocationPhone,
					emailLocation: AppController.getLocationEmail,
					viewLocationWeb: AppController.getLocationWeb,
				});
				utils.customizePageTitle(location.get("name"));
			};
			
			utils.updatejQMPage("locationdetail.html#location", options);
		};
		
		getCollections().locations.get(options.locationid, renderView);
	};
	
	
	AppController.getLocationOnMap = function(options) {
		options || (options = {});
		
		//NOTE We don't have an automatic route to this, so for now we can assume that the location is loaded
		var location = getCollections().locations.get(options.locationid);
		var mapOptions = {
			longitude: location.get("longitude"),
			latitude: location.get("latitude"),
			title: location.get("name"),
			description: location.get("description"),
		};
		devicecontext.showOnMap(mapOptions);
	};
	
	
	AppController.getLocationProductList = function(options) {
		options || (options = {});
		
		var utils = getUtils();
		var collections = getCollections();
		
		//Need a handle on a few collections between callbacks
		var thisLocation = null;
		var locationId = null;
		var allProductsCollection = null;
		var allProductLocationsCollection = null;
		
		//Callback to render the view for this list of locations
		var renderView = function(locationProducts) {			
			//We have successful view, so null the last selection
			appcontext.lastProductSelected = null;
			appcontext.lastLocationSelected = thisLocation;
			
			//if we only have one product, go straight to the right view
			if (locationProducts.length == 1) {
				AppController.getProductDetail({productid: locationProducts.at(0).get("id")});
			} else {
				options.pagecreate = function(e) {
					utils.setPageNavBar("products", "location");
				};
				
				options.pageinit = function(e) {
					utils.updateBackboneRoute("#locations/" + locationId + "/products", options);
					utils.updateBackbonePage("listProducts", locationProducts, {
						selectItem: AppController.getProductDetail,
					});
					utils.customizePageTitle(thisLocation.get("name"));
				};
				
				utils.updatejQMPage("productlist.html#products", options);
			}
		};
		
		//Callback - by this point we have the location/products/productlocations, process them to make up the collection for this location
		var processProductsForLocations = function(productLocations) {
			allProductLocationsCollection = productLocations;
			var locationProductsCollection = new ProductCollection();
			
			//Get a simple map for comparison ease of products we have already added (saves calling model.get a lot)
			var existingProductIdMap = {};
			
			//first add all the products that are available everywhere
			var availableEverywhereProducts = allProductsCollection.filter(function(product) {
				var isFiltered = product.get("availableEverywhere") == true;
				
				//add this id to our tracking map
				(isFiltered ? existingProductIdMap[product.get("id")] = true : null);
				
				return isFiltered;
			});
			
			//TODO The code in the rest of this callback is largely untested, as we don't have any location specific products yet
			var locationSpecificProductIds = [];
			var locationSpecificProductModels = [];
			
			//Now we need to go through the rest of the productlocations and add if it doesn't already exist
			var locationSpecificProductLocations = allProductLocationsCollection.filter(function(productlocation) {
				var isFiltered = productlocation.get("locationId") == locationId;
				
				//we also need to test to make sure the productid is not already marked to be in the new collection
				return (isFiltered && !(productlocation.get("productId") in existingProductIdMap)) ? true : false;
			});
			
			//Get the ids of all the products we deemed to be related to this model
			locationSpecificProductIds = locationSpecificProductLocations.map(function(productLocation) {
				return productLocation.get("productId");
			}, this);
			
			//Now, we need to actually GET the products
			locationSpecificProductModels = locationSpecificProductIds.map(function(productId) {
				return allProductLocationsCollection.get(productId);
			});
			
			
			locationProductsCollection.add(availableEverywhereProducts.concat(locationSpecificProductModels));
			renderView(locationProductsCollection);
			return;
		};
		
		//Callback - by this point we have the location and all the products, make sure we have the productlocations
		var getAllProductsForProcessing = function(products) {
			allProductsCollection = products;
			
			collections.productlocations.fetch(processProductsForLocations);
		};
		
		//Callback - by this point we have the location, make sure we have the products
		var getProductsForLocation = function(location) {
			thisLocation = location;
			var productsCollection = location.get("products");
			
			//if we already have a property, then don't cause a refresh, pass it straight on
			if (productsCollection != null && productsCollection.length != 0) {
				renderView(productsCollection);
				return;
			}
			
			//if we don't have a property, then we need to get the products
			collections.products.fetch(getAllProductsForProcessing);
		};

		
		//The product can be gotten either from the lastSelectedProduct, or via the options.productid
		if ("locationid" in options) {
			locationId = options.locationid;
			getCollections().locations.get(locationId, getProductsForLocation);
		} else if (appcontext.lastLocationSelected != null) {
			locationId = appcontext.lastLocationSelected.get("id");
			getProductsForLocation(locationId);
		} else {
			//TODO better exception handling
			throw "error - could not determine location from the context the application was in";	
		}
	};
	
	
	AppController.getLocationMap = function(options) {
		options || (options = {});
		
		alert("getLocationMap - not implemented yet");
	};
	
	AppController.getLocationPhone = function(options) {
		options || (options = {});
		
		alert("getLocationPhone - not implemented yet");
	};
	
	AppController.getLocationEmail = function(options) {
		options || (options = {});
		
		alert("getLocationEmail - not implemented yet");
	};
	
	AppController.getLocationWeb = function(options) {
		options || (options = {});
		
		alert("getLocationWeb - not implemented yet");
	};
	
	AppController.getLocationSocialConnect = function(options) {
		options || (options = {});
		var location = appcontext.lastLocationSelected;
		var utils = getUtils();
		
		//if we don't have a location, we can't do anything
		if (location == null) {
			//TODO Better exception handling strategy
			throw "error - tried to get social connect of a location but could not find the location detail";
		}
		
		//check and see if they have a twitter handle, inform user if they don't
		var locationTwitter = location.get("twitter");
		if (locationTwitter.length == 0) {
			//TODO Change this from an exception to a user notification
			alert("This location does not have any details for Twitter.");
			return;
			throw "warn - tried to get social connect of a location but there is nothing recorded for this location";
		}
		
		//callback to render the view
		var renderView = function(tweets) {
			appcontext.lastTweetCollection = tweets;
			
			options.pagecreate = function(e) {
				utils.setPageNavBar("tweets", "location");
			};
			
			options.pageinit = function(e) {
				utils.updateBackboneRoute("#locations/" + location.get("id"), options);
				utils.updateBackbonePage("tweetList", tweets);
			};
			
			utils.updatejQMPage("tweetlist.html#tweets", options);
		};
		
		var locationTweets = location.get("tweets");
		if (!(locationTweets != null && locationTweets.length > 0)) {
			var locationTweetCollection = new TweetCollection([], {username: locationTwitter});	
			location.set({tweets: locationTweetCollection});
			locationTweetCollection.fetch(renderView);
		} else {
			renderView(locationTweets);
		}
	};
	
	
	AppController.getCompanySocialConnect = function(options) {
		options || (options = {});
		
		var utils = getUtils();
		var collections = getCollections();
		
		var renderView = function(tweets) {
			appcontext.lastTweetCollection = tweets;
			
			options.pagecreate = function(e) {
				utils.setPageNavBar("tweets", "general");
			};
			
			options.pageinit = function(e) {
				utils.updateBackboneRoute("locations/" + options.locationid + "/tweets", options);
				utils.updateBackbonePage("tweetList", tweets);
			};
			
			utils.updatejQMPage("tweetlist.html#tweets", options);
		};
		
		//if there is nothing in the collection, attempt to retrieve them, otherwise just show the page again
		if (collections.companyTweets.length == 0) {
			collections.companyTweets.fetch(renderView);
		} else {
			renderView(collections.companyTweets);
		}
	};
	
	
	return AppController;
});