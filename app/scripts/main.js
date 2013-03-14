require.config({
	paths: {
		"jquery": "vendor/jquery/jquery",
		"underscore": "vendor/underscore-amd/underscore",
		"backbone": "vendor/backbone-amd/backbone",
		"handlebars": "vendor/handlebars/handlebars",
		"marionette": "vendor/backbone.marionette/lib/backbone.marionette"
	},
	shim: {
		'marionette': {
			deps: ['underscore', 'backbone'],
			exports: 'Marionette'
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