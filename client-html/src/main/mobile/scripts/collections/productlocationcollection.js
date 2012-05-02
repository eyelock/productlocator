define( ['backbone', 'models/productlocation'],
function( Backbone, ProductLocation ){
	"use strict";
	
	var ProductLocationCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: ProductLocation,

		comparator: function(model) {
			return model.get("city") + "-" + model.get("name");
		},
	});
	
	return ProductLocationCollection;
});