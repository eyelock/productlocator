define( [ 
	'appcontext',
	'collections/countrycollection',
	'collections/locationcollection',
	'collections/pagecollection',
	'collections/productcollection',
	'collections/skucollection',
	'collections/tweetcollection',
	'collections/productlocationcollection',
], function(
	appcontext,
	CountryCollection,
	LocationCollection, 
	PageCollection, 
	ProductCollection,
	SKUCollection,
	TweetCollection,
	ProductLocationCollection
) {
	"use strict";
	
	var collections = {
		productlocations: new ProductLocationCollection(),
		countries: new CountryCollection(),
		locations: new LocationCollection(),
		pages: new PageCollection(),
		products: new ProductCollection(),
		skus: new SKUCollection(),
		companyTweets: new TweetCollection([], {
			username: appcontext.social.twitterFeedCompanyUsername,
		}),
	};
	
	return collections;
});
	