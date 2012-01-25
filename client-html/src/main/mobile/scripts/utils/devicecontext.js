define( ['config', 'utils/respondertoken'],
function(config, ResponderToken) {
	"use strict";
	
	var context = {};
	
	context.isConnected = true;
	context.isDevice = false;
	context.hasLocation = false;
	context.deviceDetails = {};
	context.lastLocation = null;
	context.lastConnection = null;
	
	
	var deviceResponders = new ResponderToken();
	var locationResponders = new ResponderToken();
	var connectionResponders = new ResponderToken();
	
	context.addDeviceResponder = function(id, responder) {
		//If it's not a valid responder, the responder token will throw an error
		var wasAdded = deviceResponders.addResponder(responder);
		
		//if we aleady know it's a device, we want to sent the notification
		if (context.isDevice && wasAdded) {
			responder.success(this);
		}
		
		return wasAdded;
	};
	
	
	context.getDeviceResponders = function() {
		return deviceResponders;
	};
	
	
	context.addLocationResponder = function(id, responder) {
		//If it's not a valid responder, the responder token will throw an error
		var wasAdded = deviceResponders.addResponder(responder);
		
		//if we aleady know it's a device, we want to sent the notification
		if (context.isDevice && wasAdded) {
			responder.success(this);
		}
		
		return wasAdded;
	};
	
	
	context.getLocationResponders = function(id, responder) {
		return locationResponders;
	};
	
	
	context.addConnectionResponder = function() {
		//If it's not a valid responder, the responder token will throw an error
		var wasAdded = connectionResponders.addResponder(responder);
		
		//if we aleady know it's a device, we want to sent the notification
		if (context.lastConnection != null && wasAdded) {
			responder.success(context.lastConnection);
		}
		
		return wasAdded;
	};
	
	
	context.getConnectionResponders = function() {
		return connectionResponders;
	};
	
	
	context.deviceReadyHandler = function() {
		context.updateDeviceSettings();
		deviceResponders.notifySuccess();
	};
	
	
	context.updateDeviceSettings = function() {		
		context.updateDetailsSetting();
		context.updateLocationSetting();
		context.updateConnectionSetting();
	};
	
	
	context.updateConnectionSetting = function() {	
		//Check the connection if this is a device
		if (context.isDevice) {
			var previousConnection = context.lastConnection;
			context.lastConnection = navigator.network.connection.type;
			if (context.lastConnection == Connection.NONE) {
				context.isConnected =  false;
				console.log('warning - no connection was found for the device');
			} else {
				context.isConnected =  true;
				console.log('info - connection was found for the device.  {code: ' + context.lastConnection + '}');
			}
		} else {
			//Not on device, so we don't know if it is connected, just assume it is
			context.isConnected = true;
			console.log('info - non device, assuming connection is available');
		}
		
		//If the connection type has changed, notify the responders if needed
		if (context.lastConnection != previousConnection) {
			if (previousConnection != Connection.NONE && context.lastConnection == Connection.NONE) {
				connectionResponders.notifyFault(context.lastConnection);	
			} else {
				connectionResponders.notifySuccess(context.lastConnection);	
			}
		}
	};
	
	
	context.updateDetailsSetting = function() {
		//Check if it is a device
		var lastIsDevice = context.isDevice;
		if (typeof window.device != "undefined") {
			context.isDevice = true;
			console.log('info - considereed to be running on a device');
		} else {
			context.isDevice = false;
			console.log('info - considered to be running on non device');
		}
		
		//Get the device details set, null them if its not a device
		context.deviceDetails = {
			name: context.isDevice ? device.name : null,
			phonegap: context.isDevice ? device.phonegap : null,
			platform: context.isDevice ? device.platform : null,
			uuid: context.isDevice ? device.uuid : null,
			version: context.isDevice ? device.version : null,
		};
		
		//Fire responders if it has changed
		if (lastIsDevice != context.isDevice) {
			var method = (lastIsDevice == true) ? deviceResponders.notifyFault : deviceResponders.notifySuccess;
			method.apply(null, this);
		}
	};
	
	
	context.updateLocationSetting = function() {
		//Figure out if we can access the geolocation
		var previousHasLocation = context.hasLocation;
		if (!context.isDevice) {
			//TODO For now, just don't consider geolocation if we are not on a device
			context.hasLocation = false;
			console.log('warning - geolocation access ignored for non device');
		} else {
			navigator.geolocation.getCurrentPosition(
				function() {
					context.hasLocation = true;
					console.log('success - geolocation access was recieved');
				}
				,
				function () {
					context.hasLocation = false;
					console.log('warning - geolocation access not enabled for the device');
				}
			);
		}
		
		if (previousHasLocation != context.hasLocation) {
			var locationResponderMethod = (previousHasLocation == true) ? locationResponders.notifyFault : locationResponders.notifySuccess;
			locationResponderMethod.apply(null, this);
		}
	};

	
	
	/**
	  * options.retry - attempt retry if location is not available
	  */
	context.getLocation = function(options) {
		var geoLocationError = function(error) {
			/*
			A PositionError object is returned to the geolocationError callback when an error occurs.
			
			Properties 
			
			code: One of the predefined error codes listed below.
			message: Error message describing the details of the error encountered.
			Constants 
			
			PositionError.PERMISSION_DENIED
			PositionError.POSITION_UNAVAILABLE
			PositionError.TIMEOUT	
			*/
			
			locationResponders.notifyFault(error);
		}
		
		
		var geoLocationSuccess = function(position) {
			/*
			var onSuccess = function(position) {
				alert('Latitude: '          + position.coords.latitude          + '\n' +
					  'Longitude: '         + position.coords.longitude         + '\n' +
					  'Altitude: '          + position.coords.altitude          + '\n' +
					  'Accuracy: '          + position.coords.accuracy          + '\n' +
					  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
					  'Heading: '           + position.coords.heading           + '\n' +
					  'Speed: '             + position.coords.speed             + '\n' +
					  'Timestamp: '         + new Date(position.timestamp)      + '\n');
			};	
			*/
			
			context.lastLocation = position;
			locationResponders.notifySuccess(position);
		}
		
		
		if (!context.hasLocation && !options.retry) {
			console.log('getLocation called - location services not enabled')
		}
		
		navigator.geolocation.getCurrentPosition(geolocationSuccess, 
                                        		  geolocationError, 
                                                  config.geolocationOptions);
	};
	
	
	context.showOnMap = function(options) {
		/*
		var mapOptions = {
			longitude: location.get("longitude"),
			latitude: location.get("latitude"),
			title: location.get("name"),
			description: location.get("description"),
		};
		*/
		
		//FIXME device specific method of getting the map view
		alert("not implemented - map for " + options.title + "(" + options.latitude + "," + options.longitude + ")");
	};
	
	
	context.showInBrowser = function(options) {
		/*
		var options = {
			?
		};
		*/
		
		//FIXME device specific method
		alert("not implemented - show in browser");
	};
	
	
	context.callOnPhone = function(options) {
		/*
		var options = {
			?
		};
		*/
		
		//FIXME device specific method
		alert("not implemented - call number");
	};
	
	
	return context;
});