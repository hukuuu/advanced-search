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
		},
		'handlebars': {
			exports: 'Handlebars'
		}
	}
});

require(['app', 'modules/tracks'], function(app, tracks) {
	app.addRegions({
		tracksRegion: "div.tracks-holder"
	});
	tracks({
		app: app,
		region: app.tracksRegion
	});
	app.start();
	var state = true;
	$(function() {
		$('#toggle').on('click', function() {
			if (state) {
				app.TracksModule.stop();
				state = false;
			} else {
				app.TracksModule.start();
				state = true;
			}

		});
	});
});