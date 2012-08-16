define( ['backbone', 'appcontext'],
function( Backbone, appcontext ){
	"use strict";

	var Country = Backbone.Model.extend({
		defaults: {
			id: null,
			name: "",
			code: "",
			active: true
		}
	});
	
	return Country;
});