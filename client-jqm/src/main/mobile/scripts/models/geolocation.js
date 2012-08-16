define( ['backbone'],
function( Backbone ){
	"use strict";

	var GeoLocation = Backbone.Model.extend({
		defaults: {
			latitude: null,
			longitude: null,
			altitude: null,
			accuracy: null,
			altitudeAccuracy: null,
			heading: null,
			speed: null,
			timestamp: null,
		}
	}, {
		createFromPosition: function(position) {
			var geoLocation = new GeoLocation();
			geolocation.set({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				altitude: position.coords.altitude,
				accuracy: position.coords.accuracy,
				altitudeAccuracy: position.coords.altitudeAccuracy,
				heading: position.coords.heading,
				speed: position.coords.speed,
				timestamp: new Date(position.timestamp),
			});
		},	
		
		createFromLocation: function(location) {
			var geoLocation = new GeoLocation();
			geolocation.set({
				latitude: location.get("latitude"),
				longitude: location.get("longitude"),
				timestamp: new Date(),
			});
		},
	});
	
	GeoLocation.prototype.toAlert = function() {
		alert(this.toJSON());
	};
	
	return GeoLocation;
});