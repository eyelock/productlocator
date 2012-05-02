define( ['backbone', 'models/sku'],
function( Backbone, SKU ){
	"use strict";
	
	var SKUCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: SKU,

		comparator: function(model) {
			return model.get("productId") + "-" + model.get("name");
		},
	});
	
	
	return SKUCollection;
});