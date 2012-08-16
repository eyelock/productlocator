define( [ 
	'appcontext',
	'collections/countrycollection',
	'collections/locationcollection',
	'collections/pagecollection',
	'collections/productcollection',
	'collections/skucollection',
	'collections/tweetcollection',
], function(
	appcontext,
	CountryCollection,
	LocationCollection, 
	PageCollection, 
	ProductCollection,
	SKUCollection,
	TweetCollection
) {
	"use strict";
	
	var collections = {
		countries: new CountryCollection([], CountryCollection.createDefaultOptionsObject()),
		locations: new LocationCollection([], LocationCollection.createDefaultOptionsObject()),
		pages: new PageCollection([], PageCollection.createDefaultOptionsObject()),
		products: new ProductCollection([], ProductCollection.createDefaultOptionsObject()),
		skus: new SKUCollection([], SKUCollection.createDefaultOptionsObject()),
		
		companyTweets: new TweetCollection([], {
			username: appcontext.social.twitterFeedCompanyUsername,
		}),
	};
	
	return collections;
});
	