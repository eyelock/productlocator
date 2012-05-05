define( ['backbone', 'appcontext', 'models/sku'],
function( Backbone, appcontext, SKU ){
	"use strict";
	
	var SKUCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: SKU,

		comparator: function(model) {
			return model.get("productId") + "-" + model.get("name");
		},
	}, {
		createDefaultOptionsObject: function() {
			return {
				id: "skusCollection",
				appContext: appcontext,
				remoteUrl: appcontext.remotePaths.skus,
				localUrl: appcontext.cachePaths.skus,
			};
		}
	});
	
	
	return SKUCollection;
});