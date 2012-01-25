define( ['backbone', 'appcontext', 'models/productlocation'],
function( Backbone, appcontext, ProductLocation ){
	"use strict";
	
	var ProductLocationCollection = Backbone.Collection.extend({
		model: ProductLocation,
		//FIXME url: config.remotePaths.productlocation,
		url: appcontext.cachePaths.productlocation,
		comparator: function(model) {
			return model.get("city") + "-" + model.get("name");
		},
	});
	
	return ProductLocationCollection;
});