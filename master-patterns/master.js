/*global App, $ */
window.App = window.App || { };

// SITE object
var SITE = {
    
  // Your config object
  selectors: {
    tabSelectGroups: '.tab-select-group',
    tabContentGroups: '.tab-content-group'
  },
  
  // Cache object
  selector_cache: { },
  
  // Your get utility method
  get: function(name, refresh) {
    refresh = refresh || false;
    if(SITE.selector_cache[name] && !refresh) {
      return SITE.selector_cache[name];
    }
    else {
      return (function() {
        SITE.selector_cache[name] = $(SITE.selectors[name]);
        return SITE.selector_cache[name];
      })();
    }
  },
  
  common: {
    init: function() {
      
      console.log(App);
      
      // Bridge objects to plugins
      $.each(App.Components, function(k, v) {
        if(k !== 'Component') { // Ignore base component
          $.plugin(k.charAt(0).toLowerCase() + k.substring(1), v);
        }
      });
      
      // Example call to start the tabs running
      SITE.get('tabSelectGroups').tabs();
      
    }
  },
  
  example_controller: {
    init: function() {
      
      // Yay! I can access the cached selectors
      console.log(SITE.get('tabSelectGroups'));
      
      // And if I want to force a refresh...
      console.log(SITE.get('tabSelectGroups', true));

    }
  },
  
};


var UTIL = {
  exec: function( controller, act ) {
    var ns = SITE,
        action = (act === undefined) ? "init" : act;
    if (controller !== "" && ns[controller] && typeof ns[controller][action] === "function") {
      ns[controller][action]();
    }
  },
 
  init: function() {
    var body = document.body,
        controller = body.getAttribute("data-controller"),
        action = body.getAttribute("data-action");
    UTIL.exec("common");
    UTIL.exec(controller);
    UTIL.exec(controller, action);
  }
};

$(document).ready(UTIL.init);
