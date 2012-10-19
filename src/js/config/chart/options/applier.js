define([
  "jquery"
],

function($) {
  var toapply = $.makeArray(arguments).slice(1);
  return function(toapply, options) {
    console.log("DO APPLY");
    $.each(toapply, function() {
      this(options);
    });
    console.log(options);
  };
});