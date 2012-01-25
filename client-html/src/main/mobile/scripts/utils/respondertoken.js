define( ['backbone'],
function( Backbone ){
	"use strict";

	var ResponderToken = function (id) {
		this.id = id;
		this.responders = {};
	};
	
	
	ResponderToken.prototype.notifySuccess = function(object) {
		for(var id in this.responders) {
			if(this.responders.hasOwnProperty(id))
				this.responders[id].success(object);
		}
	};
	
	
	ResponderToken.prototype.notifyFault = function(object) {
		for(var id in this.responders) {
			if(this.responders.hasOwnProperty(id))
				this.responders[id].fault(object);
		}
	};
	
	
	ResponderToken.prototype.addResponder = function(id, responder) {
		if (!this.isResponder(this.responder)) {
			//TODO Better error handling technique needed here
			throw "the responder passed to the ResponderToken did not have valid success and fault functions";
		}
		
		if (!this.hasResponder(id)) {
			this.responders[id] = responder;
			return true;
		}
		
		return false;
	};
		
	ResponderToken.prototype.removeResponder = function(id) {
		if (!this.hasResponder(id)) {
			false;
		}
		
		delete this.responders[id];
	};
		
	ResponderToken.prototype.hasResponder = function(id) {
		return id in this.responders;
	};
		
		
	ResponderToken.prototype.isResponder = function(responder) {
		var is = true;
		
		//make sure it has a success and fault function property
		if (!("success" in responder && typeof responder.success == "function")) {
			is = false;
		}
		
		//make sure it has a success and fault function property
		if (!("fault" in responder && typeof responder.success == "fault")) {
			is = false;
		}
		
		return is;
	};
	
	
	return ResponderToken;
});