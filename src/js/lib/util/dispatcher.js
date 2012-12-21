define([
    "jquery"
  , "lib/util/uid"
],
function($, uid) {

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

  return function(flatten) {
    var filter = !!flatten
        ? (function() {
              var pattern = /\./g;
              return function(v) {
                return v.replace(pattern, "_");
              };
          })()
        : function(v) {return v;};

    var requests = {},
        states = {},
        dispatcher = {
          on : function(type, handler) {
            if(states[type]) {
              setTimeout(function() {
                handler.apply(dispatcher, states[type]);
              }, 0);
            }
            return bind(this, "on", filter(type), handler);
          },
          one : function(type, handler) {
            if(states[type]) {
              setTimeout(function() {
                handler.apply(dispatcher, states[type]);
              }, 0);
            } else {
              return bind(this, "one", filter(type), handler);
            }
          },
          when : function() {
            var types = [];
            for(var i = 0; i < arguments.length; i++) {
              types.push(this.on(arguments[i]));
            }
            return $.when.apply($, types);
          },
          off : function(type, handler) {
            $(dispatcher).off(filter(type), handler && (handler.__handler || handler));
            return dispatcher;
          },
          trigger : function(type) {
            var args = $.makeArray(arguments).slice(1);
            $(dispatcher).trigger(filter(type), args);
            return dispatcher;
          },
          request : function(type) {
            var payload = $.makeArray(arguments).slice(1),
                handler = payload.pop();
            $(requests).trigger(filter(type), [handler, payload]);
            return dispatcher;
          },
          respond : function(type, handler) {
            $(requests).on(filter(type), function(e, request_handler, payload) {
              var v = handler.apply(dispatcher, payload);
              if("undefined" === typeof v) return;
              e.stopImmediatePropagation();
              $.when(v).then(request_handler);
              return dispatcher;
            });
          },
          provide : function(type) {
            // like trigger but keep state and send the value to whoever is registering
            var payload = $.makeArray(arguments).slice(1);
            states[type] = payload;
            $(dispatcher).trigger(filter(type), payload);
            return dispatcher;
          }
        };
    return dispatcher;
  };
});