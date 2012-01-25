define( ['backbone', 'underscore', 'appcontext', 'models/page'],
function( Backbone, _, appcontext, Page ){
	"use strict";	
	
	var PageCollection = Backbone.Collection.extend({
		model: Page,
		//FIXME url: config.remotePaths.pages,
		url: appcontext.cachePaths.pages,
		comparator: function(model) {
			return model.get("id");
		},
		
		getByKey: function(keyName, keyValue) {
			var pages = _.filter(this.models, function(model) {
				return model.get(keyName) == keyValue;
			});
			
			return pages.length > 0 ? pages[0] : null;
		}
	});
	
	return PageCollection;
});