define( [
	'backbone', 
	'jquery',
	'config',
	'appcontext',
	'uiutils',
	'views/views',
	'collections/collections',
	'controllers/controllers',	
], function(
	Backbone, 
	$,
	config,
	appcontext,
	uiutils,
	views,
	collections, 
	controllers	
) {
	"use strict"; 
   
   $(function(){	   
	   window.ProductLocator = window.ProductLocator || {		
			controllers: controllers,
			views: views,			
			collections: collections,			
			uiutils: uiutils,
			config: config,
			appcontext: appcontext,
	   };
	   
	   //Start Backbone to initialize the application and also attach the nav bar binding
	   Backbone.history.start();
	   
	   //Bind the navbar controls
	   uiutils.initNavBar();
   });  
});