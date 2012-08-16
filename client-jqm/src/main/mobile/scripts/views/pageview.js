define( ['require', 'jquery', 'backbone', 'underscore', 'uiutils'],
function( require, $, Backbone, _, uiutils ) {
	"use strict";

	
	var PageView = Backbone.View.extend({
		initialize: function() {
			this.model.bind("reset", this.render, this); 
			this.template = _.template(this.options.template.html());
		},
		
		reset: function () {
			this.$el.html();
		},
		
		render: function(eventName) {	
			this.reset();
			
			uiutils.setPageTitle(this.model.get("title"));
			this.$el.html(this.template(this.model.toJSON()));
			
			//We've inserted the template, now find the contents div
			var $pageContents = this.$el.find(".content-container");
			
			//Need to sort the content blocks, by the orderedBy property
			var contentBlocksSort = function(a, b) {
				if (a.orderedBy < b.orderedBy) {
					return -1;
				} else if (a.orderedBy > b.orderedBy) {
					return 1;
				} else {
					return 0;
				}
			};
			
			var contentBlocksArray = this.model.get("contentBlocks");
			contentBlocksArray.sort(contentBlocksSort);
			
			//Add the repeating content blocks into the template
			var $pageBlockTemplate = this.$el.find(".contents-block");
			_.each(contentBlocksArray, function(pageBlocks) {
				var $thisBlock = $pageBlockTemplate.clone();
				
				//TODO - Deal with the different types of content  blocks
				$pageContents.append($thisBlock.html(pageBlocks.contents));
			});
			
			//Remove the template part
			$pageBlockTemplate.remove();
			this.$el.trigger("create");
			
			//Manually call delegate events as we didn't bind the 'el' until init time
			this.delegateEvents();
		},
		
		events: {
			"click .viewProducts"		: "viewProducts",
			"click .browseLocations"	: "browseLocations",
		},
		
		viewProducts: function(e) {
			var controllers = require("controllers/controllers");
			controllers.appcontroller.getProductsList({trigger: false});
		},
		
		browseLocations: function(e) {
			var controllers = require("controllers/controllers");
			controllers.appcontroller.getCountriesList({trigger: false});	
		},
	});
	
	return PageView;
});