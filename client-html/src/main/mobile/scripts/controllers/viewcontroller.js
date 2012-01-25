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
			el: $(context.el),
			template: $(context.template),
		});
		
		views.pageView.render();
	};
	
	
	ViewController.listProducts = function(products, context) {
		var views = getViews();
		
		views.productListView = new ProductListView({
			model: products,
			context: context,
		});
		
		views.productListView.render();
	};
	
	
	ViewController.productDetail = function(product, context) {
		var views = getViews();
		
		views.productDetailView = new ProductDetailView({
			model: product,
			context: context,
		});
		
		views.productDetailView.render();
	};	

	
	ViewController.listCountries = function(countries, context) {
		var views = getViews();
		
		views.countryListView = new CountryListView({
			model: countries,
			context: context,
		});
		
		views.countryListView.render();
	};
	
	
	ViewController.listLocations = function(locations, context) {
		var views = getViews();
		
		views.locationListView = new LocationListView({
			model: locations,
			context: context,
		});
		
		views.locationListView.render();
	};
	
	
	ViewController.locationDetail = function(location, context) {
		var views = getViews();
		
		views.locationDetailView = new LocationDetailsView({
			model: location,
			context: context,
		});
		
		views.locationDetailView.render();
	};
	
	
	ViewController.tweetList = function(tweets, context) {
		var views = getViews();
		
		views.tweetListView = new TweetListView({
			model: tweets,
			context: context,
		});
		
		views.tweetListView.render();
	};


	return ViewController;
});