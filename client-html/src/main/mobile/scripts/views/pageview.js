define( ['require', 'jquery', 'backbone', 'underscore', 'uiutils'],
function( require, $, Backbone, _, uiutils ) {
	"use strict";

	
	var PageView = Backbone.View.extend({
		initialize: function() {
			this.model.bind("reset", this.render, this); 
			this.template = _.template(this.options.template.html());
		},
		
		reset: function () {
			this.el.html();
		},
		
		render: function(eventName) {	
			this.reset();
			
			uiutils.setPageTitle(this.model.get("title"));
			this.el.html(this.template(this.model.toJSON()));
			
			//We've inserted the template, now find the contents div
			var $pageContents = this.el.find(".content-container");
			
			//Add the repeating blocks of text in
			var $pageBlockTemplate = this.el.find(".contents-block");
			_.each(this.model.get("pageBlocks"), function(pageBlocks) {
				var $thisBlock = $pageBlockTemplate.clone();
				$pageContents.append($thisBlock.html(pageBlocks));
			});
			
			//Remote the template part
			$pageBlockTemplate.remove();
			this.el.trigger("create");
			
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