define( ['jquery', 'config'],
function($, config) {
	"use strict";
	
	//Place holder for the config settings that might be altered by user settings but don't want to destroy the config values
	var context = $.extend({}, config);
	
	context.lastProductSelected = null;
	context.lastLocationSelected = null;
	context.lastTweetCollection = null;

	return context;
});