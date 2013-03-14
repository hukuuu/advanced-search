define(['marionette', 'handlebars'], function(Marionette, Handlebars) {

	Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
		return Handlebars.compile(rawTemplate);
	};

	var app = new Backbone.Marionette.Application();
	app.addInitializer(function() {
		console.log('app initialize');
	});

	return app;
});