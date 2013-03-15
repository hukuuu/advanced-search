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

require(['simpleSearch', 'advancedSearch', 'marionette'], function(simpleSearch,advancedSearch, Marionette) {
    // configure handlebars
    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };

    window.simpleSearch = simpleSearch;
    window.advancedSearch = advancedSearch;
});