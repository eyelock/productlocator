define( ['backbone'],
function(Backbone) {
	"use strict";
	
	
	/* ****************************************** 
		VIEW
	****************************************** */
	//Create the new method which gets all the related children from a collection and sets them to a property
	//It handles the lazy loading of the collection given too
	Backbone.Model.prototype.fetchChildren = function(childPropertyName, foreignKeyPropery, childCollection, newCollectionConstructor, callback) {
		var thisId = this.get("id");
		var that = this;
		
		var populateChildren = function(collection) {
			//TODO Why can't this be created out of the constructor of the childCollection argument?
			var newCollection = new newCollectionConstructor();
			
			/* FIXME This doesn't _filter ,method doesn't seem to work here
			var childModels = _.filter(collection, function(model){ 
				return model.get(foreignKeyPropery) == thisId; 
			});
			
			newCollection.add(childModels);
			*/
			var collectionLength = collection.length;
			for ( var i=0; i<collectionLength; i++) {
				var fetchedModel = collection.at(i);
				if (fetchedModel.get(foreignKeyPropery) == thisId) {
					newCollection.add(fetchedModel);
				}
			}

			var properties = {};
			properties[childPropertyName] = newCollection;
			that.set(properties);
			
			callback(that);
		}
		
		//Check and see if we already have the children, we do not overwrite existing ones, we can refetch outside this mechanism if needed		
		if (this.get(childPropertyName) != null) {
			callback(that);
			return;
		}
			
		childCollection.fetchLazily(populateChildren);
	};
	
	/* ****************************************** 
		COLLECTION
	****************************************** */
	//Create the customised version, which has the lazy load functionality
	Backbone.Collection.prototype.getLazily = function(id, callback, hasRecursed) {
		var model,
			fetchHandler,
			isRecursedAlready = typeof hasRecursed != "undefined",
			that = this;
			
		//Check the arguments, if no callback is given, then we want to use the original Backbone implementation
		if (!typeof callback == "function") {
			BackBone.Collection.prototype.get.apply(this, arguments);
			return;	
		}
		
		//We got a callback, which insinuates a lazy load approach
		model = that.get(id);
		
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
		that.bind("reset", function fetchHandler() {
			that.unbind("reset", fetchHandler);
			
			//check and see if the fetch got the id we wanted
			var fetchedModel = that.get(id);
			
			//Do the callback, assume if we pass null it's all went purple
			if (fetchedModel != null) {
				callback(fetchedModel);	
			} else {
				that.getLazily(id, callback, true);
			}	
			
			return;							
		});
		
		this.fetch();
	};
	
	
	//TODO Backbone.Collection.fetch also takes an optional 'options' argument, factor it into this method
	Backbone.Collection.prototype.fetchLazily = function(callback, hasRecursed) {
		var fetchHandler,
			isRecursedAlready = typeof hasRecursed != "undefined",
			that = this;
			
		//Check the arguments, if no callback is given, then we want to use the original Backbone implementation
		if (!typeof callback == "function") {
			BackBone.Collection.prototype.get.apply(that, arguments);
			return;	
		}
		
		//If we get a model, just return straight away to the callback	
		if (that.length > 0) {
			callback(this);
			return;
		}
		
		//If we have recursed already, don't recurse again, throw an error
		if (hasRecursed) {
			//TODO Better error strategy needed
			throw "error - recursion has occurred already when trying to lazily fetch an item by it's id";	
		}

		//Let's try and get the model by fetching from the service
		//NOTE when you fetch, any return causes a reset event
		//FIXME this might cause an infinite loop
		that.bind("reset", function fetchHandler() {
			that.unbind("reset", fetchHandler);
			callback(that);	
			return;							
		});
		
		that.fetch();
	};
});