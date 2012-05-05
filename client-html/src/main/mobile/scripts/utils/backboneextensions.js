define( ['backbone', 'underscore'],
function(Backbone, _) {
	"use strict";
	
	Backbone.Custom = Backbone.Custom || {};
	
	
	/* ****************************************** 
		VIEW
	****************************************** */
	//Create the new method which gets all the related children from a collection and sets them to a property
	//It handles the lazy loading of the collection given too
	Backbone.Model.prototype.fetchChildren = function(childPropertyName, foreignKeyPropery, childCollection, newCollectionConstructor, callback) {
		var that = this;
		
		var populateChildren = function(collection) {
			//TODO Why can't this be created out of the constructor of the childCollection argument?
			var newCollection = new newCollectionConstructor();
			
			var collectionLength = collection.length;
			for ( var i=0; i<collectionLength; i++) {
				var fetchedModel = collection.at(i);
				if (that.objectIdAttributeEquals.call(that, fetchedModel.get(foreignKeyPropery))) {
					newCollection.add(fetchedModel);
				}
			}

			var properties = {};
			properties[childPropertyName] = newCollection;
			that.set(properties);
			
			callback(that);
		};
		
		//Check and see if we already have the children, we do not overwrite existing ones, we can refetch outside this mechanism if needed		
		if (this.get(childPropertyName) != null) {
			callback(that);
			return;
		}
			
		childCollection.fetch(populateChildren);
	};
	
	
	Backbone.Model.prototype.objectIdAttributeEquals = function(object) {		
		if (!object[this.idAttribute]) {
			throw new Error("Cannot check the object against this model, since the object does not share a property that is the same as this idAttribute");
		}
		
		return this.get(this.idAttribute) == object[this.idAttribute];
	};
	
	
	
	/* ****************************************** 
		COLLECTION
	****************************************** */
	Backbone.Custom.Collections = Backbone.Custom.Collections || {};
	
	Backbone.Custom.Collections.LazyCollection = function(models, options) {
		//If we have options, then persist the values we need for online/offline toggling
		if (options != null) {
			this.id = "id" in options ? options.id : null;
			this.remoteUrl = "remoteUrl" in options ? options.remoteUrl : null;
			this.localUrl = "localUrl" in options ? options.localUrl : null;
			this.appContext = "appContext" in options ? options.appContext : null;
			
			//Set up a hook into the app context to listen for connection changes
			var connectionResponder = {
					success: function(appcontext) {
						//TODO Figure out what should happen to a collection when the connection state toggles
					},
					
					fault: function(appcontext) {
						//No-op
					},
				};
				
			this.appContext.addConnectionResponder(this.id, connectionResponder);
		}
		
		this._super_ = Backbone.Collection.prototype;
		this._super_.constructor.apply(this, arguments);	
	};
	
	_.extend(Backbone.Custom.Collections.LazyCollection, Backbone.Collection);
	
	_.extend(Backbone.Custom.Collections.LazyCollection.prototype, Backbone.Collection.prototype, {		
		url: function() {
			//If we have appContext, then we can set up a toggle responder
			if (this.appContext != null) {
				return this.appContext.isOffline ? this.localUrl : this.remoteUrl;
			} else {
				//this should never get here, since setting the url into the prototype overrides this function
				return this.__proto__.url;
			}
		},

		get: function(id, callback, hasRecursed) {
			var model,
				isRecursedAlready = typeof hasRecursed != "undefined",
				that = this;
			 
			if (!id)
				return;
				
			//Check the arguments, if no callback is given, then we want to use the original Backbone implementation
			if (!(typeof callback == "function")) {
				return this._super_.get.apply(this, arguments);
			}
			
			//We got a callback, which insinuates a lazy load approach
			//First check and see if this collection has a Model by that Id
			model = this._super_.get.apply(this, [id]);
			
			//If we get a model, just return straight away to the callback	
			if (model != null) {
				callback(model);
				return;
			}
			
			
			//If we have recursed already, don't recurse again, throw an error
			if (isRecursedAlready) {
				//TODO Better error strategy needed
				throw "error - recursion has occurred already when trying to lazily fetch an item by it's id";	
			}
	
			//Let's try and get the model by fetching from the service
			//NOTE when you fetch, any return causes a reset event
			//FIXME this assumes that all fetches return at least 1 item!!!!!
			var fetchHandler = null;
			that.bind("reset", function fetchHandler() {
				that.unbind("reset", fetchHandler);
				
				//check and see if the fetch got the id we wanted
				var fetchedModel = that._super_.get.apply(that, [id]);
				
				//Do the callback, assume if we pass null it's all went purple
				if (fetchedModel != null) {
					callback(fetchedModel);	
				} else {
					that.get(id, callback, true);
				}	
				
				return;							
			});
			
			this.fetch();
		},
		
		
		fetch: function(callback, hasRecursed) {
			var fetchHandler = null,
				isRecursedAlready = typeof hasRecursed != "undefined",
				that = this;
				
			//Check the arguments, if no callback is given, then we want to use the original Backbone implementation
			if (!(typeof callback == "function")) {
				this._super_.fetch.apply(that, arguments);
				return;	
			}
			
			//If we get a model, just return straight away to the callback	
			if (that.length > 0) {
				callback(this);
				return;
			}
			
			//If we have recursed already, don't recurse again, throw an error
			if (isRecursedAlready) {
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
			
			this._super_.fetch.apply(that, null);
		},
	});
});