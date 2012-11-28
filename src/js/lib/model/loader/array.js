define([
  "jquery"
],

function() {
  return function(data) {
    return function(success, error, progress) {
      setTimeout(function() {
        success(data);
      }, 0);
    };
  };
});