define( ['backbone', 'appcontext', 'models/location'],
function( Backbone, appcontext, Location ){
	"use strict";
	
	var LocationCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Location,
		//FIXME url: config.remotePaths.locations,
		url: appcontext.cachePaths.locations,
		comparator: function(model) {
			return model.get("city") + "-" + model.get("name");
		},
	});
	
	return LocationCollection;
});