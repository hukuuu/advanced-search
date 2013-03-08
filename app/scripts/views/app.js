define(['marionette'],function(Marionette){
	console.log(Marionette);
	var App = Backbone.View.extend({
		initialize: function(){
			console.log('yesss');
		}
	});
	return App;
});