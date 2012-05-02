define( ['backbone', 'models/product'],
function( Backbone, Product ){
	"use strict";

	var ProductCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Product,
		
		comparator: function(model) {
			return model.get("name");
		},
	});
	
	
	return ProductCollection;
});