define(['marionette', 'handlebars','modules/tracks','modules/simple-search'], function(Marionette, Handlebars, tracks, simpleSearch) {

	var app = new Backbone.Marionette.Application();

    app.addRegions({
        tracksRegion: "div.tracks-holder"
    });

    //augment the app with TracksModule
    tracks(app);

    //augment the app with SimpleSearchModule
    simpleSearch(app);

    app.addInitializer(function(options) {
		console.log('app initialize');
        app.TracksModule.start({
            region: app.tracksRegion
        });

        app.SimpleSearchModule.start({
            from: 'input.from',
            to: 'input.to',
            map:'div.map-canvas',
            button: 'button.submit-search'
        });

	});

	return app;
});