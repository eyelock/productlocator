define( ['backbone', 'appcontext', 'models/location'],
function( Backbone, appcontext, Location ){
	"use strict";
	
	var LocationCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Location,

		comparator: function(model) {
			return model.get("city") + "-" + model.get("name");
		},
		
		initialize: function(models, options) {
			options || (options = {});
			this.product = "product" in options ? options.product : null;
		},
		
		url: function() {
			var productURL = null;
			var baseUrl = Backbone.Custom.Collections.LazyCollection.prototype.url.call(this);
			
			if (this.product) {
				productURL = this.product.getLocationsUrl();
			}
			
			return productURL || baseUrl;
		},
		
	}, {
		createDefaultOptionsObject: function() {
			return {
				id: "locationCollection",
				appContext: appcontext,
				remoteUrl: appcontext.remotePaths.locations,
				localUrl: appcontext.cachePaths.locations,
			};
		}
	});
	
	return LocationCollection;
});