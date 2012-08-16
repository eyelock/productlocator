define( ['jquery', 'backbone', 'underscore', 'uiutils', 'views/locationlistrowview'],
function( $, Backbone, _, uiutils, LocationListRowView ) {
	"use strict";
	
	
	var LocationListView = Backbone.View.extend({
		lastCity: "",
		
		initialize: function() {
			this.template = _.template(this.options.template.html());
			this.model.bind("reset", this.render, this); 
		},
		
		reset: function() {
			this.lastCity = "";
			this.$el.html("");
		},
		
		render: function(eventName) {
			//Since we always put in different types of list items, we need to recreate each time
			//For example, locations per country, locations per city, locations per product
			//NOTE Margin for performance improvement here, some sort of cachine
			this.reset();
			
			uiutils.processListForFilterRequirement(this.$el, this.model.models.length);
			
			var itemRenderer = function(location) {
				//Add a divider if needed
				//TODO Figure out how to get this as a proper template/view
				if (location.get("city") != this.lastCity) {
					this.lastCity = location.get("city");
					var $divider = $("<li data-role=\"list-divider\">" + this.lastCity + "</li>");
					$(this.$el).append($divider);
				}
				
				//Process the location
				var itemId = "location-item-" + location.get("id");
				
				if (this.$el.find("#"+itemId).length == 0) {
					$(this.$el).append(new LocationListRowView({
						id: itemId,
						model: location,
						context: ("context" in this.options) ? this.options.context : null,
					}).render().el);
				}
			}
			
			_.each(this.model.models, itemRenderer, this);
			
			//Manually call delegate events as we didn't bind the 'el' until init time and refresh the jquery mobile
			this.delegateEvents();
			//FIXME If we add data-filter, this doesnt update the list UI
			this.$el.listview("refresh");
		},
	});
	
	return LocationListView;
});