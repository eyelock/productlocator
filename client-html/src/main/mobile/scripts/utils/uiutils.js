define( ['require', 'jquery', 'appcontext'],
function( require, $, appcontext ) {
	"use strict";
	
	var cachedControllers = null;
	var getControllers = function() {
		if (cachedControllers == null) {
			cachedControllers = require("controllers/controllers");
		}
		return cachedControllers;
	};
	
	var uiUtils = {		
		isHome: function() {
			var hash = $.mobile.path.parseUrl(document.location.href).hash;
			return hash == "#" || hash == "";;
		},	
		
		
		processListForFilterRequirement: function(element, rowCount) {
			if (rowCount >= appcontext.minListItemsForFilter) {
				element.attr("data-filter", "true");
			}
		},
		
	
		updatejQMPage: function(href, options, callback) {
			var updateJQMCallback,
				pagecreateHandler,
				pageinitHandler;
			
			var changeOptions = typeof options == "undefined" ? {} : options;
			
			//See if we have an callbacks listening for events
			var pagecreate = "pagecreate" in options ? options.pagecreate : null;
			var pageinit = "pageinit" in options ? options.pageinit : null;
			
			//when the page is created, but jquery mobile hasn't operated on it yet
			if (pagecreate != null) {
				$(document).bind("pagecreate", function pagecreateHandler(e) {
					pagecreate(e);
					$(document).unbind("pagecreate", pagecreateHandler);
				});
			}
			
			//the page has been created and transitions have been applied
			if (pageinit != null) {
				$(document).bind("pageinit", function pagecreateHandler(e) {
					pageinit(e);
					$(document).unbind("pageinit", pagecreateHandler);
				});
			}
			
			//TODO This callback is legacy, change all code to use the options object properties
			//Set up the callback to listen for the page create			
			if (callback != null && typeof callback == "function") {
				$(document).bind("pagecreate", function updateJQMCallback() {
					callback();
					$(document).unbind("pagecreate", updateJQMCallback);
				});
			}
			
			$.mobile.changePage(href, {
				transition: ("transition" in changeOptions) ? changeOptions.transition : "slide",
				reverse: ("reverse" in changeOptions) ? changeOptions.reverse : false,
				changeHash: ("changeHash" in changeOptions) ? changeOptions.changeHash : false
			});
		},
		
		updateBackboneRoute: function(route, options) {
			var willTriggerRoute = (typeof options != "undefined" && "trigger" in options) ? (options.trigger || false) : false;
			getControllers().approuter.navigate(route, willTriggerRoute);
		},
		
		updateBackbonePage: function(page, model, context) {
			getControllers().viewcontroller[page].apply(null, [model, context]);
		},
		
		getPageTitle: function() {
			var $title = $.mobile.activePage.find(".header h1");
			var title = "";
			
			if ($title != null)
				title = $title.html();
				
			return title;
		},
		
		setPageTitle: function(title) {
			var $title = $.mobile.activePage.find(".header h1");
			
			if ($title != null)
				$title.html(title);
		},
		
		customizePageTitle: function(text, delim, appendMoreThanOne) {
			delim = ("delim" in arguments) ? delim : ": ";
			appendMoreThanOne = ("appendMoreThanOne" in arguments) ? appendMoreThanOne : false;
			var currentPageTitle = uiUtils.getPageTitle();
			
			//If we havne't instructed to appendMoreThanOne then just return the delim already exists
			if (!appendMoreThanOne && currentPageTitle.indexOf(delim) > 0) {
				return;
			}
			
			uiUtils.setPageTitle(currentPageTitle + delim + text);
		},
		
		setPageFooter: function(content) {
			//var $footer = $.mobile.activePage.find(".footer");

			if ($footer != null && content != null) {
				$footer.html(content);
				$footer.trigger("create");
			}
		},
		
		
		setPageNavBar: function(pageId, navBarType) {
			//TODO clean up the jquery references, there seems to be a lot of re-creation of jquery objects
			//logic seeems like it could be streamlined as well
			
			var $footer = $(".footer");
			var activeStateClasses = "ui-btn-active ui-state-persist";
			
			if (navBarType == "product") {
				$footer.find(".footerNavbarProduct").css("display", "block");
				$footer.find(".footerNavbarGeneral").css("display", "none");
				$footer.find(".footerNavbarLocation").css("display", "none");

				
				switch (pageId) {
					case "locations": {
						$footer.find(".footerNavbarProduct .nav-button-home").removeClass(activeStateClasses);
						$footer.find(".footerNavbarProduct .nav-button-locations").addClass(activeStateClasses);
						$footer.find(".footerNavbarProduct .nav-button-nearest").removeClass(activeStateClasses);
						break;
					}
					
					case "nearest": {
						$footer.find(".footerNavbarProduct .nav-button-home").removeClass(activeStateClasses);
						$footer.find(".footerNavbarProduct .nav-button-locations").removeClass(activeStateClasses);
						$footer.find(".footerNavbarProduct .nav-button-nearest").addClass(activeStateClasses);
						break;
					}
				}
				
			} else if (navBarType == "location") {
				$footer.find(".footerNavbarProduct").css("display", "none");
				$footer.find(".footerNavbarGeneral").css("display", "none");
				$footer.find(".footerNavbarLocation").css("display", "block");
				
				switch (pageId) {
					case "social": {
						$footer.find(".footerNavbarLocation .nav-button-products").removeClass(activeStateClasses);
						$footer.find(".footerNavbarLocation .nav-button-socialconnect").addClass(activeStateClasses);
						break;
					}
					
					case "products": {
						$footer.find(".footerNavbarLocation .nav-button-products").removeClass(activeStateClasses);
						$footer.find(".footerNavbarLocation .nav-button-socialconnect").addClass(activeStateClasses);
						break;
					}
				}
				
				
			} else {
				$footer.find(".footerNavbarGeneral").css("display", "block");
				$footer.find(".footerNavbarProduct").css("display", "none");
				$footer.find(".footerNavbarLocation").css("display", "none");
				
				switch (pageId) {
					case "page": {
						$footer.find(".footerNavbarGeneral .nav-button-home").addClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-products").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-locations").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-socialconnect").removeClass(activeStateClasses);
						break;
					}
					
					case "products": {
						$footer.find(".footerNavbarGeneral .nav-button-home").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-products").addClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-locations").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-socialconnect").removeClass(activeStateClasses);
						break;
					}
					
					case "locations": {
						$footer.find(".footerNavbarGeneral .nav-button-home").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-products").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-locations").addClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-socialconnect").removeClass(activeStateClasses);
						break;
					}
					
					case "tweets": {
						$footer.find(".footerNavbarGeneral .nav-button-home").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-products").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-locations").removeClass(activeStateClasses);
						$footer.find(".footerNavbarGeneral .nav-button-socialconnect").addClass(activeStateClasses);
						break;
					}
				}				
			}
			
			$footer.trigger("refresh");
		},
		
		
		processViewEvent: function(action, args) {
			var view = this;
			
			//Validate that we have a context in the view
			if (!("options" in view && "context" in view.options)) {
				//FIXME Throw proper error
				throw "error - context not found for view";
			}
			
			var context = view.options.context;
			
			//Validate that we have the appropriate action in the context
			if (!(action in context)) {
				throw "error - the view requested an action of '" + action + "' which was not found in the context";
			}
			
			//We are good to go, we have an action 
			context[action].apply(view, args || []);
		},
		
		
		initNavBar: function() {
			var appcontroller = getControllers().appcontroller;
			
			$(document).on("click", "a.navGoHome", function() {
				appcontroller.getPage({key: "home", reverse: true});
			});
			
			$(document).on("click", "a.navViewProducts", function() {
				appcontroller.getProductsList({reverse: !uiUtils.isHome()});
			});
			
			$(document).on("click", "a.navViewLocations", function() {
				appcontroller.getCountriesList({reverse: !uiUtils.isHome()});
			});
		
			$(document).on("click", "a.navSocialConnect", function() {
				appcontroller.getCompanySocialConnect({reverse: !uiUtils.isHome()});
			});
			
			$(document).on("click", "a.navProductViewLocations", function() {
				appcontroller.getProductCountryList({productid: appcontext.lastProductSelected.get("id")});
			});
			
			$(document).on("click", "a.navProductNearest", function() {
				appcontroller.getProductLocationNearest({productid: appcontext.lastProductSelected.get("id")});
			});
			
			$(document).on("click", "a.navLocationProducts", function() {
				appcontroller.getLocationProductList({locationid: appcontext.lastLocationSelected.get("id")});
			});
			
			$(document).on("click ", "a.navLocationSocialConnect", function() {
				appcontroller.getLocationSocialConnect({locationid: appcontext.lastLocationSelected.get("id")});
			});
			
			$(document).on("click ", "a.refreshTweetCollection", function() {
				if (appcontext.lastTweetCollection != null)
					appcontext.lastTweetCollection.fetch();
			});
		},
	};
	
	return uiUtils;
});