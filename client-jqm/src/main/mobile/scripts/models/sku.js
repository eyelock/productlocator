define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var SKU = Backbone.Model.extend({
		defaults: {
			id: null,
			productId: null,
			pageId: 0,
			name: "",
			description: "",
			image: "",
			price: null,
			active: true
		}	 
	});
	
	return SKU;
});
