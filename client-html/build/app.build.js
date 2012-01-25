({
    appDir: "../html/",
    baseUrl: "scripts",
    dir: "./html/",

    optimize: "uglify",

    paths: {
        'backbone':         		'libs/backbonejs/AMDbackbone-0.5.3',
        'underscore':      		 	'libs/backbonejs/underscore-1.2.3.min',
        'jquery':           		'libs/jquery/jquery-1.7.1.min',
        'jquerymobile':     		'libs/jquery/jquery.mobile-1.0.min',
		'jquery-mobile-iscroll':   	'libs/jquery/jquery.mobile.iscroll',
		'iscroll':   				'libs/iscroll-3.7.1',
		'json2':     				'libs/json2',
		'phonegap':     			'libs/phonegap-1.3.0',
		
		'app':     					'app',
		'config':     				'config',
		'appcontext':  				'utils/appcontext',
		'devicecontext': 			'utils/devicecontext',
		'uiutils':     				'utils/uiutils',
    },

    modules: [
        {
            name: "app",
			
            include: [
				"utils/respondertoken",
            ],
			
            exclude: [
				"devicecontext",
                "config",
				'backbone',
				'underscore',
				'jquery',
				'jquerymobile',
				'jquery-mobile-iscroll',
				'iscroll',
				'json2',
				'phonegap',
            ]
        }
    ]
})