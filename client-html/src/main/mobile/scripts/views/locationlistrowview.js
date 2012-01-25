define( ['require', 'jquery', 'backbone', 'underscore', 'uiutils'],
function( require, $, Backbone, _, uiutils ) {
	"use strict";

	
	var LocationListRowView = Backbone.View.extend({
		tagName: "li",
		
		initialize: function() {
			this.template = _.template($('#location-list-row').html());
			
			this.model.bind("change", this.render, this);
			this.model.bind("destroy", this.close, this);
		},
		
		render: function(eventName) {
			var $el = $(this.el);
			$el.html(this.template(this.model.toJSON()));
			
			//set the data-filtertext attribute to allow for better searching within a list
			$el.attr("data-filtertext", this.model.toFilterString());
			
			return this;
		},
		
		events: {
			"click":          "selectItem",
		},
		
		selectItem: function(e) {
			uiutils.processViewEvent.apply(this, [
				"selectItem",  //the context action
				[{locationid: this.model.get("id")}] //the arguments to the context action
			]);
		},
		
		close: function() {
			$(this.el).unbind();
			$(this.el).remove();
		},
	});
	
	return LocationListRowView;
});