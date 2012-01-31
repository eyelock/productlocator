define( ['jquery', 'backbone', 'underscore', 'uiutils', 'views/productlistrowview'],
function( $, Backbone, _, uiutils, ProductListRowView ) {
	"use strict";
	
	
	var ProductListView = Backbone.View.extend({
		selectedHandler: null,
		
		initialize: function() {
			this.template = _.template(this.options.template.html());
			this.model.bind("reset", this.render, this); 
		},
		
		render: function(eventName) {
			uiutils.processListForFilterRequirement(this.$el, this.model.models.length);
			
			var itemRenderer = function(product) {
				var itemId = "product-item-" + product.get("id");
				
				if (this.$el.find("#"+itemId).length == 0) {
					this.$el.append(new ProductListRowView({
						id: itemId,
						model: product,
						context: ("context" in this.options) ? this.options.context : null,
					}).render().el);
				}
			}
			
			_.each(this.model.models, itemRenderer, this);
			
			//Manually call delegate events as we didn't bind the 'el' until init time and refresh the jquery mobile
			this.delegateEvents();
			this.el.listview("refresh");
		},
	});
	
	return ProductListView;
});