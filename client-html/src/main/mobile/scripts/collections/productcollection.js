define( ['backbone', 'appcontext', 'models/product'],
function( Backbone, appcontext, Product ){
	"use strict";

	var ProductCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Product,
				
		//FIXME url: appcontext.remotePaths.products,
		url: appcontext.cachePaths.products,
		
		comparator: function(model) {
			return model.get("name");
		},
	});
	
	
	return ProductCollection;
});