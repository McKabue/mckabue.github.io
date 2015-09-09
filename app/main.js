/// <reference path="B:\Docs\REPOS\Tri-Project\PPA\PPA\Scripts/jquery-2.1.3.js" />
/// <reference path="../Scripts/app/script.js" />


requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/composition'], //
	function (app, viewLocator, system, composition) {

	    //var router = require('plugins/router');

	    //>>excludeStart("build", true);
	    system.debug(true);
	    //>>excludeEnd("build");

	    app.title = 'McKabue';

	    //specify which plugins to install and their configuration
	    app.configurePlugins({
	        router: true,
	        dialog: true,
            //knockoutExtentions: true
	    });

	    








	    app.start().then(function () {
	        viewLocator.useConvention();

	        app.setRoot('shell', 'entrance');

	    });
	});
