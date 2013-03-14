define(['marionette', 'handlebars'], function(Marionette, Handlebars) {

	var app = new Backbone.Marionette.Application();
	app.addInitializer(function() {
		console.log('app initialize');
	});

	// configure handlebars 
	Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
		return Handlebars.compile(rawTemplate);
	};

	return app;
});