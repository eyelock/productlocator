define( ['backbone', 'jquery', 'underscore', 'appcontext', 'models/tweet'],
function( Backbone, $, _, appcontext, Tweet ){
	"use strict";
	
	var TweetCollection = Backbone.Collection.extend({
		username: null,
		model: Tweet,
		
		comparator: function(model) {
			return model.getDateStringForSort();
		},
		
		initialize: function(models, options) {
			options || (options = {});
			
			if (!"username" in options) {
				throw "username missing from intiailization properties of TweetCollection (ie new TweetCollection([], {username: 'twitter'}) )";
			}
			
			this.username = options.username;
		},
	});
	
	TweetCollection.prototype.getFeedURL = function() {
		var social = appcontext.social;
		
		return social.twitterFeedURL
			.replace(social.twitterFeedUsernameToken, this.username)
			.replace(social.twitterFeedCountToken, appcontext.maxNoTweets);
	};
		
	TweetCollection.prototype.fetchLazily = function(callback) {
		var that = this;
		$.mobile.showPageLoadingMsg();
		
		$.getJSON(this.getFeedURL(), function(data){
			that.add([], {silent: true});
			var tempTweets = [];
			
			$.each(data, function(i,item){
				var tweet = new Tweet();
				tweet.set({
					id: item.id,
					message: item.text,
					posted: new Date(Date.parse(item.created_at)),
					user: item.user.screen_name,
				});
				
				tempTweets.push(tweet);
			});
			
			that.reset(tempTweets);
			
			$.mobile.hidePageLoadingMsg();
			
			if (typeof callback != "undefined")
				callback(that);
		});
	};
	
	
	return TweetCollection;
});