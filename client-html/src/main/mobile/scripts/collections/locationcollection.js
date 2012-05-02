define( ['backbone', 'models/location'],
function( Backbone, Location ){
	"use strict";
	
	var LocationCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Location,

		comparator: function(model) {
			return model.get("city") + "-" + model.get("name");
		},
	});
	
	return LocationCollection;
});