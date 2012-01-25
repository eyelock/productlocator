define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var Product = Backbone.Model.extend({
		urlRoot: appcontext.remotePaths.products,
		defaults: {
			id: null,
			pageId: 0,
			code: null,
			name: "",
			teaser: "",
			description: "",
			image: "",
			icon: "",
			availableEverywhere: false,
			active: true
		}	   
	});
	
	return Product;
});