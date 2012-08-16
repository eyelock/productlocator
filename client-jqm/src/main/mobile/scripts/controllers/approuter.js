define( [
	'require', 
	'backbone', 
],
function( 
	require,
	Backbone
) {
	"use strict";
	
	var cachedControllers = null;
	var getControllers = function() {
		if (cachedControllers == null) {
			cachedControllers = require("controllers/controllers");
		}
		
		return cachedControllers;
	};

	var AppRouter = Backbone.Router.extend({		
		routes: {
			//route to products
			"products"														: "listProducts",
			"products/:productid"											: "productDetail",
			
			//route to locations - note can't get a list of all locations, that would be overwhelming
			"locations/:locationid"											: "locationDetail",
			"locations/:locationid/products"								: "locationProducts",
			"locations/:locationid/tweets"									: "locationTweets",
			
			//route to locations, via products - signifies want to see locations based on products
			"products/:productid/countries"									: "listProductCountries",
			"products/:productid/countries/:countryid/locations"			: "listProductCountryLocations",
			
			//route to locations, via countries - signifies want to see products based on locations
			"countries"														: "listCountries",
			"countries/:countryid/locations"								: "countryLocations",
			
			//misc routes
			"page/:pageid"													: "getPage",
			"tweets"														: "getTweets",
			""																: "getHome",
		},
		
		getHome: function() {
			getControllers().appcontroller.getPage({key: "home"});	
		},
		
		getTweets: function() {	
			getControllers().appcontroller.getCompanySocialConnect();
		},
		
		getPage: function(pageid) {	
			getControllers().appcontroller.getPage({pageid: pageid});
		},
		
		listProducts: function() {
			getControllers().appcontroller.getProductsList();
		},
		
		productDetail: function(productid) {
			getControllers().appcontroller.getProductDetail({productid: productid});
		},
		
		listProductCountries: function(productid) {
			getControllers().appcontroller.getProductCountryList({productid: productid});
		},
		
		listProductCountryLocations: function(productid, countryid) {
			getControllers().appcontroller.getProductCountryLocationList({productid: productid, countryid: countryid});
		},
		
		listCountries: function() {
			getControllers().appcontroller.getCountriesList();
		},
		
		countryLocations: function(countryid) {
			getControllers().appcontroller.getCountryLocationList({countryid: countryid});
		},
		
		countryLocationDetail: function(countryid, locationid) {
			getControllers().appcontroller.getCountryLocationDetail({countryid: countryid, locationid: locationid});
		},		
		
		locationDetail: function(locationid) {
			getControllers().appcontroller.getLocationDetail({locationid: locationid});
		},
		
		locationProducts: function(locationid) {
			getControllers().appcontroller.getLocationProductList({locationid: locationid});
		},
		
		locationTweets: function(locationid) {
			getControllers().appcontroller.getCompanySocialConnect({locationid: locationid});
		},
	});
	
	return AppRouter;			
});