define( [],
function() {
	"use strict";
	
	var config = {};
	
	config.contextRoot = "/locator-html/mobile";
	config.remoteBaseURL = "http://localhost/locator-api";
	config.minListItemsForFilter = 12;
	config.maxNoTweets = 20;
	
	config.remotePaths = {
		productlocation: "api/productlocations",
		products: "api/products",
		skus: "api/skus",
		locations: "api/locations",
		countries: "api/countries",
		pages: "api/pages",
	};
	
	config.cachePaths = {
		productlocation: "data/productlocations.json",
		products: "data/products.json",
		skus: "data/skus.json",
		locations: "data/locations.json",
		countries: "data/countries.json",
		pages: "data/pages.json",
	};
	
	config.social = {
		twitterFeedCompanyUsername: "pincervodka",
		twitterFeedUsernameToken: "SCREEN_NAME",
		twitterFeedCountToken: "TWEET_COUNT",
		twitterFeedURL: "http://twitter.com/statuses/user_timeline.json?screen_name=SCREEN_NAME&count=TWEET_COUNT&callback=?",
	};
	
	config.geolocationOptions = {
		maximumAge: 3000, 
		timeout: 5000, 
		enableHighAccuracy: true,
	};	
	
	
	return config;
});