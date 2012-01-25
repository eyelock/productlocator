define( ['require', 'jquery', 'backbone', 'underscore', 'uiutils'],
function( require, $, Backbone, _, uiutils ) {
	"use strict";

	
	var CountryListRowView = Backbone.View.extend({
		tagName: "li",
		
		initialize: function() {
			this.template = _.template($('#country-list-row').html());
			
			this.model.bind("change", this.render, this);
			this.model.bind("destroy", this.close, this);
		},
		
		render: function(eventName) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		events: {
			"click":		"selectItem"
		},
		
		selectItem: function(e) {
			uiutils.processViewEvent.apply(this, [
				"selectItem",  //the context action
				[{countryid: this.model.get("id")}] //the arguments to the context action
			]);
		},
		
		close: function() {
			$(this.el).unbind();
			$(this.el).remove();
		},
	});
	
	return CountryListRowView;
});