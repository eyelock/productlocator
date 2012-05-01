define( ['backbone', 'appcontext', 'models/sku'],
function( Backbone, appcontext, SKU ){
	"use strict";
	
	var SKUCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: SKU,
		//FIXME url: appcontext.remotePaths.skus,
		url: appcontext.cachePaths.skus,
		comparator: function(model) {
			return model.get("productId") + "-" + model.get("name");
		},
	});
	
	
	return SKUCollection;
});