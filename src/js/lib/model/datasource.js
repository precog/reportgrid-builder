define([
],

function() {

  return function(loader) {
    var ds;
    return ds = {
      loader : function(handler) {
        if("undefined" === typeof handler) {
          return loader;
        }  else {
          loader = handler;
          return this;
        }
      },
      load : function(callback, callbackError) {
        $(ds).trigger("loading", [ds]);
        loader(
          function(data) {
            if(callback) callback(data);
            $(ds).trigger("data", [data, ds]);
            $(ds).trigger("complete", [ds]);
          },
          function(error) {
            if(callbackError) callbackError(error);
            $(ds).trigger("error", [error, ds]);
            $(ds).trigger("complete", [ds]);
          }
        );
      }
      // events: data, error, loading, complete
    };
  };
});