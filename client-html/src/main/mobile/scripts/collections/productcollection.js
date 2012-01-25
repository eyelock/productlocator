define( ['backbone', 'appcontext', 'models/product'],
function( Backbone, appcontext, Product ){
	"use strict";

	var ProductCollection = Backbone.Collection.extend({
		model: Product,
				
		//FIXME url: appcontext.remotePaths.products,
		url: appcontext.cachePaths.products,
		
		comparator: function(model) {
			return model.get("name");
		},
	});
	
	
	/*
	ProductCollection.prototype.lazyGet = function(id, callback, hasRecursed) {
		var model = this.get(id),
			fetchHandler,
			isRecursedAlready = typeof hasRecursed != "undefined";
		
		//If we get a model, just return straight away to the callback	
		if (model != null) {
			callback(model);
			return;
		}
		
		//If we have recursed already, don't recurse again, throw an error
		if (hasRecursed) {
			//TODO Better error strategy needed
			throw "error - recursion has occurred already when trying to lazily fetch an item by it's id";	
		}

		//Let's try and get the model by fetching from the service
		//NOTE when you fetch, any return causes a reset event
		//FIXME this assumes that all fetches return at least 1 item!!!!!
		this.bind("reset", function fetchHandler() {
			this.unbind("reset", fetchHandler);
			
			//check and see if the fetch got the id we wanted
			var fetchedModel = this.get(id);
			
			//Do the callback, assume if we pass null it's all went purple
			if (fetchedModel != null) {
				callback(fetchedModel);	
			} else {
				this.lazyGet(id, callback, true);
			}	
			
			return;							
		});
		
		this.fetch();
	};
	*/

	
	return ProductCollection;
});