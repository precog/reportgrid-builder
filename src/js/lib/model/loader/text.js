define([
  "jquery"
],

function() {
  return function(data) {
    var cache;
    return function(success, error, progress) {
      setTimeout(function() {
        if(cache) {
          success(cache);
          return;
        }
        try {
          cache = JSON.parse(data);
          if(!cache instanceof  Array || "object" !== typeof cache[0]) {
            error("data must be an array of objects");
          } else {
            success(cache);
          }
        } catch(e) {
          error("error parsing JSON text: " + e);
        }
      }, 0);
    };
  };
});