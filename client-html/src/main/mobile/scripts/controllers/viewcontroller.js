define( [
	'require',
	'jquery',
	'views/pageview',
	'views/productlistview',
	'views/productdetailview',
	'views/locationlistview',
	'views/countrylistview',
	'views/locationdetailview',
	'views/tweetlistview',
],
function( 
	require,
	$,
	PageView,
	ProductListView,
	ProductDetailView,
	LocationListView,
	CountryListView,
	LocationDetailsView,
	TweetListView
) {
	"use strict";
	
	var ViewController = {};
	
	var cachedViews = null;
	var getViews = function() {
		if (cachedViews == null) {
			cachedViews = require("views/views");
		}
		return cachedViews;
	};
	
	
	ViewController.getPage = function(page, context) {
		var views = getViews();
		
		views.pageView = new PageView({
			model: page,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.pageView.setElement($(context.pageSelector));
		views.pageView.render();
	};
	
	
	ViewController.listProducts = function(products, context) {
		var views = getViews();
		
		views.productListView = new ProductListView({
			model: products,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.productListView.setElement($(context.pageSelector));
		views.productListView.render();
	};
	
	
	ViewController.productDetail = function(product, context) {
		var views = getViews();
		
		views.productDetailView = new ProductDetailView({
			model: product,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.productDetailView.setElement($(context.pageSelector));
		views.productDetailView.render();
	};	

	
	ViewController.listCountries = function(countries, context) {
		var views = getViews();
		
		views.countryListView = new CountryListView({
			model: countries,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.listCountries.setElement($(context.pageSelector));
		views.countryListView.render();
	};
	
	
	ViewController.listLocations = function(locations, context) {
		var views = getViews();
		
		views.locationListView = new LocationListView({
			model: locations,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.locationListView.setElement($(context.pageSelector));
		views.locationListView.render();
	};
	
	
	ViewController.locationDetail = function(location, context) {
		var views = getViews();
		
		views.locationDetailView = new LocationDetailsView({
			model: location,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.locationDetailView.setElement($(context.pageSelector));
		views.locationDetailView.render();
	};
	
	
	ViewController.tweetList = function(tweets, context) {
		var views = getViews();
		
		views.tweetListView = new TweetListView({
			model: tweets,
			context: context,
			template: $(context.templateSelector),
		});
		
		views.tweetListView.setElement($(context.pageSelector));
		views.tweetListView.render();
	};


	return ViewController;
});