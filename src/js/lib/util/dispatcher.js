define([
  "jquery"
],
function($) {

  function applyon(dispatcher, handler) {
    return handler.__handler || (handler.__handler = function() {
      handler.apply(dispatcher, $.makeArray(arguments).slice(1));
    });
  }

  function bind(dispatcher, method, type, handler) {
    if(handler) {
      $(dispatcher)[method](type, applyon(this, handler));
      return dispatcher;
    } else {
      return $.Deferred(function(dfd) {
        $(dispatcher)[method](type, function() {
          dfd.resolve($.makeArray(arguments).slice(1));
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
      when : function() {
        var types = [];
        for(var i = 0; i < arguments.length; i++) {
          types.push(this.on(arguments[i]));
        }
        return $.when.apply($, types);
      },
      off : function(type, handler) {
        $(dispatcher).off(type, handler && (handler.__handler || handler));
        return dispatcher;
      },
      trigger : function(type) {
        var args = $.makeArray(arguments).slice(1);
        $(dispatcher).trigger(type, args);
        return dispatcher;
      }
    };
    return dispatcher;
  };
});
