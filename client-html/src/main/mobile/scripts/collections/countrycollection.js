define( ['backbone', 'models/country'],
function( Backbone, Country ){
	"use strict";
	
	var CountryCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Country,

		comparator: function(model) {
			return model.get("name");
		},
	});
	
	return CountryCollection;
});