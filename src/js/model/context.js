define([
  "jquery"
],
function($) {

  function applyon(ctx, handler) {
    handler.handler = handler.handler || function() {
      handler.apply(ctx, arguments);
    };
    return handler.handler;
  }

  function bind(ctx, method, type, handler) {
    if(handler) {
      $(ctx)[method](type, applyon(this, handler));
      return ctx;
    } else {
      return $.Deferred(function(dfd) {
        $(ctx)[method](type, function() {
          dfd.resolve(arguments);
        });
      }).promise();
    }
  }

  return function() {
    var ctx = {
      on : function(type, handler) {
        return bind(this, "on", type, handler);
      },
      one : function(type, handler) {
        return bind(this, "one", type, handler);
      },
      off : function(type, handler) {
        $(ctx).off(type, handler && (handler.hanlder || handler));
        return ctx;
      },
      trigger : function(type) {
        var args = $(arguments).slice(1);
        $(ctx).trigger(type, args);
        return ctx;
      }
    };
    return ctx;
  };
});
