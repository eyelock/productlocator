define( ['require', 'jquery', 'backbone', 'underscore', 'uiutils'],
function( require, $, Backbone, _, uiutils ) {
	"use strict";

	
	var TweetListRowView = Backbone.View.extend({
		tagName: "li",
		
		initialize: function() {
			this.template = _.template($('#tweet-list-row').html());
			
			this.model.bind("change", this.render, this);
			this.model.bind("destroy", this.close, this);
		},
		
		render: function(eventName) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		close: function() {
			$(this.el).unbind();
			$(this.el).remove();
		},
	});
	
	return TweetListRowView;
});