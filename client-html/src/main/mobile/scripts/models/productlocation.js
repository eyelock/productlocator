define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var ProductLocation = Backbone.Model.extend({
		urlRoot: appcontext.remotePaths.productlocations,
		defaults: {
			id: null,
			productId: null,
			locationId: null,
			active: true
		}	 
	});
	
	return ProductLocation;
});