define( ['jquery', 'config', 'devicecontext', 'utils/respondertoken'],
function($, config, devicecontext, ResponderToken) {
	"use strict";
	
	//Place holder for the config settings that might be altered by user settings but don't want to destroy the config values
	var context = $.extend({}, config);
	
	context.lastProductSelected = null;
	context.lastLocationSelected = null;
	context.lastTweetCollection = null;
	
	
	//Track whether the app is connected or offline, and allow for responders to register for notification
	context.isOffline = false;
	
	var connectionResponders = new ResponderToken();
	
	context.addConnectionResponder = function(id, responder) {
		return connectionResponders.addResponder(id, responder);		
	};
	
	context.removeConnectionResponder = function(id) {
		return connectionResponders.removeResponder(id);
	};
	
	context.getOfflineResponders = function() {
		return connectionResponders;
	};
	
	
	//Hook up a listener to whether this is a device or not
	var deviceResponder = {
			success: function(theDeviceContext) {
				//Set up a responder to monitor when the connection comes or goes
				var deviceConnectionResponder = {
					success: function(theDeviceContext) {
						context.isOffline = !context.isConnected; 
						connectionResponders.notifySuccess(context);
					},
					
					fault: function(theDeviceContext) {
						connectionResponders.notifyFault(context);
					},
				};
				
				//Add the listener for the device connection
				devicecontext.addConnectionResponder("appcontext", deviceConnectionResponder);
			},
			
			fault: function(theDeviceContext) {
				//No-op, don't do anything if it isn't a device
			},
		};
	
	//Add the listener for whether this is a device or not
	devicecontext.addDeviceResponder("appcontext", deviceResponder);

	
	return context;
});