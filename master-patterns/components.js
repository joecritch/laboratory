/*global _, jQuery, Class */
window.App = window.App || { };
App.Components = App.Components || { };
(function($, undefined) {
  
  var Components = this;
  
  /**
   * Base component
   */
  var Component = Class.extend({
    init: function(options, elem) {
      this.options = $.extend( {}, this.options, options );
      this.elem  = elem;
      this.$elem = $(elem);
      return this;
    },
    options : {
      currentClass: 'current',
      disabledClass: 'disabled'
    }
  });
  
  /**
   * Select box tabs
   * (Simple example of component)
   */
   Components.Tabs = Component.extend({
     init: function( options, elem ) {
       this._super(options, elem);
       this.$container = this.$elem.parent();
       this.$group = this.$container.find(this.options.groupSelector);
       this.$tabContents = this.$group.find(this.options.contentSelector);
       this.$select = this.$elem.find('select');
       this.onOpen = this.options.onOpen;
       this._bindEvents();
       return this;
     },
     options: {
       onOpen: function($a, $tabContent) { },
       groupSelector: '.tab-content-group',
       contentSelector: '.tab-content'
     },
     _bindEvents: function() {
       this.$select.change(_.bind(this.open, this));
     },
     open: function(e, silent) {
       silent = silent || false;
       if(e) {
         e.preventDefault();
       }
       var $select = $(e.currentTarget);
       var $option = $select.find('option:selected');
       var $tabContent = this.$tabContents.eq($option.index());
       this.$tabContents.hide().removeClass(this.options.currentClass);
       $tabContent.show().addClass(this.options.currentClass);
       if(!silent) {
         this.onOpen.call(this, $option, $tabContent);
       }
     }
   });
  
}).call(App.Components, jQuery);