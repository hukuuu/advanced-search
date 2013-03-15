define(['marionette'], function(Marionette) {

	var TrackItemView = Marionette.ItemView.extend({
		tagName: "li",
		template: "#track-template"
	});

	var TracksListCompositeView = Backbone.Marionette.CompositeView.extend({
		tagName: 'section',
		className: 'tracks',
		template: "#trackList-template",
		itemView: TrackItemView,
		itemViewContainer: 'ul.tracks-container'
	});

	var Track = Backbone.Model.extend({
		defaults: {
			from: 'foo',
			to: 'bar'
		}
	});

	var TracksCollection = Backbone.Collection.extend({
		model: Track,
		url: 'tracks.json'
	});


	return function(app) {

        var module = app.module("TracksModule");

        module.startWithParent = false;

        var region = {};

		module.addInitializer(function(options) {
            region = options.region;
			console.log('track module initialize',options);

            var tracks = new TracksCollection();
			tracks.fetch();
			region.show(new TracksListCompositeView({
				collection: tracks
			}));
		});
		module.addFinalizer(function() {
			console.log('finalize track module');
			region.close();
		});

	};
});