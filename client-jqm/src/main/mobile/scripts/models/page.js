define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var Page = Backbone.Model.extend({
		defaults: {
			name: "",
			key: "",
			listable: true,
			icon: "",
			title: "",
			image: "",
			pageBlocks: null,
		}	 
	});
	
	return Page;
});