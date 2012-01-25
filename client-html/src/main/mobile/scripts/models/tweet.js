define( ['backbone'],
function( Backbone ){
	"use strict";

	var Tweet = Backbone.Model.extend({
		defaults: {
			id: null,
			message: "",
			posted: null,
			user: "",
		},
	});
	
	Tweet.prototype.getDateStringForSort = function() {
		//we want a reverse sort for a twitter feed
		return this.get("posted").getTime() * -1;
	};
	
	return Tweet;
});