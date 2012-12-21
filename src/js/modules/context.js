define([
    "jquery"
  , "lib/util/dispatcher"
],
function($, createDispatcher) {
  var logger = window.console || {info:function(){}};
  var log = function() {
        logger.groupCollapsed("%c"+arguments[0]+": "+arguments[1], 'background: #222; color: #bada55');
        [new Date().toLocaleTimeString()].concat($.makeArray(arguments).slice(2)).forEach(function(v) {
          logger.info(v);
        });
        logger.groupEnd();
      };

  return function(debug) {
    var ctx = createDispatcher(true);

    ctx.debug = debug;

    // DEBUG
    if(debug) {
      var counter = {},
          states  = {};

      var generic_extractor = function(name, args) {
            return [name, args[0], args.slice(1)];
          },
          methods = [
              { name    : "trigger" }
            , { name    : "provide" }
            , { name    : "on" }
//            , { name    : "one" }
            , { name    : "off", extract: function(name, args) { return [name]; } }
            , { name    : "when", extract: function(name, args) { return [name]; } }
            , { name    : "request", extract: function(name, args) { return [name]; } }
            , { name    : "respond", extract: function(name, args) { return [name]; } }
          ];

      for(var i = 0; i < methods.length; i++) {
        (function(method) {
          var name     = method.name,
              extract  = method.extract || generic_extractor,
              original = ctx[name];
          ctx[name] = function() {
            var args = extract(name, $.makeArray(arguments));
            var type = (ctx.counter[args[0]] || (ctx.counter[args[0]] = {}));
            type[args[1]] = (type[args[1]] || 0) + 1;
            log.apply(window, args);
            original.apply(ctx, arguments);
          }
        })(methods[i]);
      }
      /*
      ctx.trigger = function() {
        var type = arguments[0];
        ctx.counter[type] = (ctx.counter[type] || 0) + 1;
        log.apply(window, arguments);
        trigger.apply(ctx, arguments);
      };

      var provide = ctx.provide;
      ctx.provide = function() {
        var type = arguments[0];
        ctx.counter[type] = (ctx.counter[type] || 0) + 1;
        log.apply(window, arguments);
        provide.apply(ctx, arguments);
      };
*/
      ctx.log = function() {
        log.apply(window, arguments);
      };

      ctx.counter = function() {
        return counter;
      }
    } else {
      ctx.log = function() {};
    }

    return ctx;
  };
});
