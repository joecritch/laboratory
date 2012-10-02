// Create a plugin based on a defined object
// by http://pastie.org/517177
$.plugin = function(name, object) {
  $.fn[name] = function(options) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var instance = $.data(this, name);
      if (instance) {
        instance[options].apply(instance, args);
      } else {
        instance = $.data(this, name, new object(options, this));
      }
    });
  };
};