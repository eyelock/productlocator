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
		productlocations: new ProductLocationCollection([], {
			id: "productLocationsCollection",
			appContext: appcontext,
			remoteUrl: appcontext.remotePaths.productlocation,
			localUrl: appcontext.cachePaths.productlocation,
		}),
		
		countries: new CountryCollection([], {
			id: "countryCollection",
			appContext: appcontext,
			remoteUrl: appcontext.remotePaths.countries,
			localUrl: appcontext.cachePaths.countries,
		}),
		
		locations: new LocationCollection([], {
			id: "locationCollection",
			appContext: appcontext,
			remoteUrl: appcontext.remotePaths.locations,
			localUrl: appcontext.cachePaths.locations,
		}),
		
		pages: new PageCollection([], {
			id: "pageCollection",
			appContext: appcontext,
			remoteUrl: appcontext.remotePaths.pages,
			localUrl: appcontext.cachePaths.pages,			
		}),
		
		products: new ProductCollection([], {
			id: "productCollection",
			appContext: appcontext,
			remoteUrl: appcontext.remotePaths.products,
			localUrl: appcontext.cachePaths.products,
		}),
		
		skus: new SKUCollection([], {
			id: "skuCollection",
			appContext: appcontext,
			remoteUrl: appcontext.remotePaths.skus,
			localUrl: appcontext.cachePaths.skus,
		}),
		
		companyTweets: new TweetCollection([], {
			username: appcontext.social.twitterFeedCompanyUsername,
		}),
	};
	
	return collections;
});
	