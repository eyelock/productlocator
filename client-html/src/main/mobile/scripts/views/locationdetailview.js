define( ['jquery', 'backbone', 'underscore', 'uiutils', 'devicecontext'],
function( $, Backbone, _, uiutils, devicecontext ) {
	"use strict";

	
	var LocationDetailView = Backbone.View.extend({			
		initialize: function() {
			this.el = $("#location .content");
			this.template = _.template($('#location-detail-body').html());
			this.model.bind("reset", this.render, this); 
		},
		
		render: function(eventName) {		
			uiutils.setPageTitle(this.model.get("name"));
			this.el.html(this.template(this.model.toJSON()));
			
			//Disable the call button if this isn't a device
			if (!devicecontext.isDevice) {
				this.el.find(".callLocationPhone").remove();
			}
			
			//Needed as we are setting the element at initialization
			this.delegateEvents();
			this.el.trigger("create");
		},
		
		events: {
			"click .viewLocationMap"			: "viewLocationMap",
			"click .callLocationPhone"			: "callLocationPhone",
			"click .emailLocation"				: "emailLocation",
			"click .viewLocationWeb"			: "viewLocationWeb",
		},
		
		viewLocationMap: function() {
			uiutils.processViewEvent.apply(this, [
				"viewLocationMap",  //the context action
				[{locationid: this.model.get("id")}] //the arguments to the context action
			]);
		},
		
		callLocationPhone: function() {
			uiutils.processViewEvent.apply(this, [
				"callLocationPhone",  //the context action
				[{locationid: this.model.get("id")}] //the arguments to the context action
			]);
		},
		
		emailLocation: function() {
			uiutils.processViewEvent.apply(this, [
				"emailLocation",  //the context action
				[{locationid: this.model.get("id")}] //the arguments to the context action
			]);
		},
		
		viewLocationWeb: function() {
			uiutils.processViewEvent.apply(this, [
				"viewLocationWeb",  //the context action
				[{locationid: this.model.get("id")}] //the arguments to the context action
			]);
		},
	});
	
	return LocationDetailView;
});