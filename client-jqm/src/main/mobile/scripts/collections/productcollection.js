define( ['backbone', 'appcontext', 'models/product'],
function( Backbone, appcontext, Product ){
	"use strict";

	var ProductCollection = Backbone.Custom.Collections.LazyCollection.extend({
		model: Product,
		
		comparator: function(model) {
			return model.get("name");
		},
		
		initialize: function(models, options) {
			options || (options = {});
			this.location = "location" in options ? options.location : null;
		},
		
		url: function() {
			var locationUrl = null;
			var baseUrl = Backbone.Custom.Collections.LazyCollection.prototype.url.call(this);
			
			if (this.location) {
				locationUrl = this.location.getProductsUrl();
			}
			
			return locationUrl || baseUrl;
		},
		
	}, {
		createDefaultOptionsObject: function() {
			return {
				id: "productsCollection",
				appContext: appcontext,
				remoteUrl: appcontext.remotePaths.products,
				localUrl: appcontext.cachePaths.products,
			};
		}
	});
	
	
	return ProductCollection;
});