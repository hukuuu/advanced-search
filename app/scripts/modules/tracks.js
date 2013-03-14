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


	return function(options) {
		var region = options.region,
			app = options.app,
			module = app.module("TracksModule");

		module.addInitializer(function() {
			console.log('track module initialize');
			var tracks = new TracksCollection();
			tracks.fetch();
			options.region.show(new TracksListCompositeView({
				collection: tracks
			}));
		});
		module.addFinalizer(function() {
			console.log('finalize track module');
			region.close();
		});

	};
});