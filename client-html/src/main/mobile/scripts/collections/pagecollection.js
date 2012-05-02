define( ['backbone', 'underscore', 'models/page'],
function( Backbone, _, Page ){
	"use strict";	
	
	var PageCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Page,

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