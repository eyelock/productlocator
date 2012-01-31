require.config( {
    paths: {
        'backbone':         		'libs/backbonejs/backbone',
        'underscore':      		 	'libs/backbonejs/underscore',
        'jquery':           		'libs/jquery/jquery.min',
        'jquerymobile':     		'libs/jquery/jquery.mobile',
		'jquery-mobile-iscroll':   	'libs/jquery/jquery.mobile.iscroll',
		'iscroll':   				'libs/misc/iscroll',
		'json2':     				'libs/misc/json2',

		'backboneextensions': 		'utils/backboneextensions',
		'appcontext':     			'utils/appcontext',
		'devicecontext': 			'utils/devicecontext',		
		'config':     				'config',
		'app':     					'app',
		'uiutils':     				'utils/uiutils',
    },
    baseUrl: 'scripts'
} );

require(
		//Load the main frameworks
        ['require', 'jquery', 'underscore', 'json2'],
        function( require, $, _ ) {
	    	  _.templateSettings = {
	    			    evaluate    : /<%=([\s\S]+?)%>/g,
	    			    interpolate : /<%= =([\s\S]+?)%>/g,
	    			    escape      : /<%= -([\s\S]+?)%>/g
	    			  };
        	
        	
            //load the secondary frameworks - needing to load jquerymobile, before loading the jquery-iscroll
            require(
                    ['require', 'backbone', 'jquerymobile', 'iscroll', 'config'],
                    function( require, Backbone ) {
						//load the plugins and the app
						require(
							['require', 'devicecontext', 'backboneextensions', 'jquery-mobile-iscroll', 'app'],
							function( require, devicecontext ) {
								 // Turn off jQuery Mobile hash listening, app uses the Backbone router
								 // as per detailed at https://github.com/addyosmani/backbone-fundamentals
								$.mobile.hashListeningEnabled = false;
								$.mobile.pushStateEnabled = false;
								//$.mobile.fixedToolbars.setTouchToggleEnabled(false);
								//$.mobile.page.prototype.options.addBackBtn = true;
								
								//Bind the device ready to the context
								document.addEventListener("deviceready", function() {
									devicecontext.deviceReadyHandler();
								}, false);
							})
                    });
        });
