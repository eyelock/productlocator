define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var Page = Backbone.Model.extend({
		urlRoot: appcontext.remotePaths.pages,
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