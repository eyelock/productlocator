define( ['jquery', 'backbone', 'underscore', 'uiutils'],
function( $, Backbone, _, uiutils ) {
	"use strict";

	
	var ProductDetailView = Backbone.View.extend({			
		initialize: function() {
			this.el = $("#product .content");
			this.template = _.template($('#product-detail-body').html());
			this.model.bind("reset", this.render, this); 
		},
		
		render: function(eventName) {					
			uiutils.setPageTitle(this.model.get("name"));
			$(this.el).html(this.template(this.model.toJSON()));
			
			//Needed as we are setting the element at initialization
			this.delegateEvents();
			this.el.trigger("create");
		},
		
		events: {
			"click .viewItems"					: "viewItemsHandler",
			"click .browseLocations"			: "browseLocationsHandler",
			"click .nearestLocations"			: "nearestLocationsHandler",
		},
		
		viewItemsHandler: function() {
			//TODO Show the SKU page for this product
			alert('viewItemsHandler - not implemented');
		},
		
		browseLocationsHandler: function() {
			//TODO Show the full list of locations for this product
			alert('browseLocationsHandler - not implemented');
		},
		
		nearestLocationsHandler: function() {
			//TODO Show a list of locations, showing the nearest one
			alert('nearestLocationsHandler - not implemented');
		},
	});
	
	return ProductDetailView;
});