define([
  "jquery"
],

function($) {
  return function(extractors) {
    return function(o, dimensions, options) {
      $.each(extractors, function() {
        this(o, dimensions, options);
      });
    };
  };
});