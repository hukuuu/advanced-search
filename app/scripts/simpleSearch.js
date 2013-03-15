define(['marionette', 'handlebars','modules/simple-search'], function(Marionette, Handlebars, simpleSearch) {

    var app = new Backbone.Marionette.Application();

    app.addRegions({
        tracksRegion: "div.tracks-holder"
    });

    //augment the app with SimpleSearchModule
    simpleSearch(app);

    app.addInitializer(function(options) {
        console.log('app initialize');

        app.SimpleSearchModule.start({
            from: 'input.from',
            to: 'input.to',
            map:'div.map-canvas',
            button: 'button.submit-search'
        });

    });



    return app;
});