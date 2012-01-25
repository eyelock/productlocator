define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var SKU = Backbone.Model.extend({
		urlRoot: appcontext.remotePaths.skus,
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
