define( ['backbone', 'appcontext', 'models/geolocation'],
function( Backbone, appcontext, GeoLocation ){
	"use strict";

	var Location = Backbone.Model.extend({
		urlRoot: appcontext.remotePaths.locations,
		
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
			active: true
		},
	});
	
	Location.prototype.hasGeolocation = function () {
		return this.get("latitude") != null && this.get("longitude");
	};
	
	Location.prototype.hasGeolocation = function () {
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