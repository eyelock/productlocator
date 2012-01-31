define( ['jquery', 'backbone', 'underscore', 'uiutils', 'views/countrylistrowview'],
function( $, Backbone, _, uiutils, CountryListRowView ) {
	"use strict";
	
	
	var ProductListView = Backbone.View.extend({		
		initialize: function() {
			this.template = _.template(this.options.template.html());
			this.model.bind("reset", this.render, this); 
		},
		
		reset: function() {
			this.$el.html("");
		},
		
		render: function(eventName) {
			//Since we always put in different types of list items, we need to recreate each time
			//For example, locations per country, locations per city, locations per product
			//NOTE Margin for performance improvement here
			this.reset();
			
			uiutils.processListForFilterRequirement(this.$el, this.model.models.length);
			
			var itemRenderer = function(country) {
				var itemId = "country-item-" + country.get("id");

				if (this.$el.find("#"+itemId).length == 0) {
					this.$el.append(new CountryListRowView({
						id: itemId,
						model: country,
						context: ("context" in this.options) ? this.options.context : null,
					}).render().el);
				}
			}
			
			_.each(this.model.models, itemRenderer, this);
			
			//Manually call delegate events as we didn't bind the 'el' until init time and refresh the jquery mobile
			this.delegateEvents();
			this.$el.listview("refresh");
		},
	});
	
	return ProductListView;
});