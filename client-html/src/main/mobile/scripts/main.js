require.config( {
    paths: {
        'backbone':         		'libs/backbonejs/AMDbackbone-0.5.3',
        'underscore':      		 	'libs/backbonejs/underscore-1.2.3.min',
        'jquery':           		'libs/jquery/jquery-1.7.1.min',
        'jquerymobile':     		'libs/jquery/jquery.mobile-1.1.alpha',
		'jquery-mobile-iscroll':   	'libs/jquery/jquery.mobile.iscroll',
		'iscroll':   				'libs/misc/iscroll-3.7.1',
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
