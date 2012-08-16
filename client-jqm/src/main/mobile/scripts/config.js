define( [],
function() {
	"use strict";
	
	var config = {};
	
	config.contextRoot = "/client-jqm/mobile";
	config.remoteBaseURL = "http://localhost:8080/server-roo/";
	config.minListItemsForFilter = 12;
	config.maxNoTweets = 20;
	
	config.remotePaths = {
		products: config.remoteBaseURL + "api/products",
		skus: config.remoteBaseURL + "api/stockkeepingunits",
		locations: config.remoteBaseURL + "api/locations",
		countries: config.remoteBaseURL + "api/countries",
		pages: config.remoteBaseURL + "api/articles",
	};
	
	config.cachePaths = {
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