define( ['jquery', 'backbone', 'underscore', 'uiutils', 'views/tweetlistrowview'],
function( $, Backbone, _, uiutils, TweetListRowView ) {
	"use strict";
	
	
	var TweetListView = Backbone.View.extend({		
		initialize: function() {
			this.el = $("#tweet-list");
			this.template = _.template($('#tweet-list-row').html());
			this.model.bind("reset", this.render, this); 
		},
		
		reset: function() {
			this.el.html("");
		},
		
		render: function(eventName) {
			//Since we always put in different types of list items, we need to recreate each time
			//For example, locations per country, locations per city, locations per product
			//NOTE Margin for performance improvement here
			this.reset();
			
			uiutils.processListForFilterRequirement(this.el, this.model.models.length);
			
			var itemRenderer = function(tweet) {
				var itemId = "tweet-item-" + tweet.get("id");

				if (this.el.find("#"+itemId).length == 0) {
					this.el.append(new TweetListRowView({
						id: itemId,
						model: tweet,
						context: ("context" in this.options) ? this.options.context : null,
					}).render().el);
				}
			}
			
			uiutils.setPageTitle(this.model.username + "'s Tweets");
			_.each(this.model.models, itemRenderer, this);
			
			//Manually call delegate events as we didn't bind the 'el' until init time and refresh the jquery mobile
			this.delegateEvents();
			this.el.listview("refresh");
		},
		
		events: {
			"click .refreshTweets":		"refreshTweets"
		},
		
		refreshTweets: function() {
			//FIXME This is a header bar button, so might need to attach at document level or go up
			alert('freadf');
			this.model.refreshFeed();
		},
	});
	
	return TweetListView;
});