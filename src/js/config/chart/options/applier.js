define([
  "jquery"
],

function($) {
  var toapply = $.makeArray(arguments).slice(1);
  return function(toapply, options, preferences) {
    $.each(toapply, function() {
      this(options, preferences);
    });
  };
});