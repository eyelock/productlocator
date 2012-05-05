define( ['backbone', 'appcontext', 'collections/locationcollection'],
function( Backbone, appcontext, LocationCollection ){
	"use strict";

	var Product = Backbone.Model.extend({
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
			active: true,
			locations: null
		}	   
	});
	
	Product.prototype.createLocationsUrl = function () {
		return appcontext.remotePaths.products + this.get("id") + "/locations";
	};
	
	Product.prototype.initializeLocations = function () {	
		var options = LocationCollection.createDefaultOptionsObject();
		options.product = this;
		this.set("locations", new LocationCollection(null, options));
	};
	
	Product.prototype.get = function (property) {
		if (property === "locations" && this.attributes[property] == null) {
			this.initializeLocations();
		}
		
		return Backbone.Model.prototype.get.call(this, property);
	};
	
	return Product;
});