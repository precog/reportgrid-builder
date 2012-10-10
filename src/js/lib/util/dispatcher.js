define([
  "jquery"
],
function($) {

  function applyon(dispatcher, handler) {
    handler.handler = handler.handler || function() {
      handler.apply(dispatcher, $(arguments).slice(1));
    };
    return handler.handler;
  }

  function bind(dispatcher, method, type, handler) {
    if(handler) {
      $(dispatcher)[method](type, applyon(this, handler));
      return dispatcher;
    } else {
      return $.Deferred(function(dfd) {
        $(dispatcher)[method](type, function() {
          dfd.resolve($(arguments).slice(1));
        });
      }).promise();
    }
  }

  return function() {
    var dispatcher = {
      on : function(type, handler) {
        return bind(this, "on", type, handler);
      },
      one : function(type, handler) {
        return bind(this, "one", type, handler);
      },
      off : function(type, handler) {
        $(dispatcher).off(type, handler && (handler.hanlder || handler));
        return dispatcher;
      },
      trigger : function(type) {
        var args = $(arguments).slice(1);
        $(dispatcher).trigger(type, args);
        return dispatcher;
      }
    };
    return dispatcher;
  };
});
