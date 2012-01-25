define( [ 
	'controllers/appcontroller',
	'controllers/viewcontroller',
	'controllers/approuter',
], function(
	appcontroller,
	viewcontroller,
	AppRouter
) {
	"use strict";
	
	var controllers = {
		appcontroller: appcontroller,
		approuter: new AppRouter(),
		viewcontroller: viewcontroller,
	};
	
	return controllers;
});