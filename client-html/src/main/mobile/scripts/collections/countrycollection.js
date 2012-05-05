define( ['backbone', 'appcontext','models/country'],
function( Backbone, appcontext, Country ){
	"use strict";
	
	var CountryCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Country,

		comparator: function(model) {
			return model.get("name");
		},
	}, {
		createDefaultOptionsObject: function() {
			return {
				id: "countryCollection",
				appContext: appcontext,
				remoteUrl: appcontext.remotePaths.countries,
				localUrl: appcontext.cachePaths.countries,
			};
		}
	});
	
	return CountryCollection;
});