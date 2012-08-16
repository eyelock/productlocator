define( ['backbone', 'appcontext', 'collections/productcollection', 'models/geolocation'],
function( Backbone, appcontext, ProductCollection, GeoLocation ){
	"use strict";

	var Location = Backbone.Model.extend({
		defaults: {
			id: null,
			pageId: 0,
			name: "",
			description: "",
			address01: "",
			address02: "",
			city: "",
			postcode: "",
			countryId: null,
			image: "",
			url: "",
			email: "",
			phone: "",
			twitter: "",
			latitude: null,
			longitude: null,
			active: true,
			products: null
		}
	});
	
	Location.prototype.getProductsUrl = function () {
		return appcontext.remotePaths.locations + "/" + this.get("id") + "/products";
	};
	
	Location.prototype.initializeProducts = function () {	
		var options = ProductCollection.createDefaultOptionsObject();
		options.location = this;
		this.set("products", new ProductCollection(null, options));
	};
	
	Location.prototype.get = function (property) {
		if (property === "products" && this.attributes[property] == null) {
			this.initializeProducts();
		}
		
		return Backbone.Model.prototype.get.apply(this, arguments);
	};
	
	Location.prototype.hasGeolocation = function () {
		return this.get("latitude") != null && this.get("longitude");
	};
	
	Location.prototype.getGeolocation = function () {
		var cachedGeoLocation = this.get("_geolocation");
		
		if (cachedGeoLocation == null) {
			cachedGeoLocation = GeoLocation.createFromLocation(this);			
			this.set({ _geolocation: cachedGeoLocation });
		}
				
		return cachedGeoLocation;
	};
	
	Location.prototype.toFilterString = function() {
		return this.get("name")
				+ ", " + this.get("address01")
				+ ", " + this.get("address02")
				+ ", " + this.get("city");
	};
	
	return Location;
});