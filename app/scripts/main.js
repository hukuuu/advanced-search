require.config({
	paths: {
		"jquery": "vendor/jquery/jquery",
		"underscore": "vendor/underscore-amd/underscore",
		"backbone": "vendor/backbone-amd/backbone",
		"handlebars": "vendor/handlebars/handlebars",
		"backbone.marionette": "vendor/backbone.marionette/lib/backbone.marionette",
		"marionette": "vendor/backbone.marionette.handlebars/backbone.marionette.handlebars"
	},
	shim: {
		'backbone.marionette': {
			deps: ['underscore', 'backbone']
		}
	}
});

require(['views/app'], function(AppView) {
	new AppView();
});