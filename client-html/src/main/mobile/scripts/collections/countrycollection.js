define( ['backbone', 'appcontext', 'models/country'],
function( Backbone, appcontext, Country ){
	"use strict";
	
	var CountryCollection = Backbone.Collection.extend({
		model: Country,
		//FIXME url: config.remotePaths.countries,
		url: appcontext.cachePaths.countries,
		comparator: function(model) {
			return model.get("name");
		},
	});
	
	return CountryCollection;
});