define([
  "jquery"
],

function($) {
  var toapply = $.makeArray(arguments).slice(1);
  return function(toapply, options) {
    $.each(toapply, function() {
      this(options);
    });
  };
});