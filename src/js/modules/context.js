define([
    "jquery"
  , "lib/util/dispatcher"
],
function($, createDispatcher) {
  var logger = window.console || {log:function(){}},
      colors = {
        on      : "#f6f6f6",
        one     : "#eaeaea",
        off     : "#ffe0e0",
        trigger : "#eff",
        request : "#fef",
        respond : "#ffe",
        provide : "#efe"
      },
      log = function() {
        logger.groupCollapsed("%c"+arguments[0]+": "+arguments[1], 'color: #999; font-weight: normal; background-color: ' + (colors[arguments[0]] || "#fff"));
        logger.log("%c"+new Date().toLocaleTimeString(),"color:#bbb;font-size:85%");
        $.makeArray(arguments).slice(2).forEach(function(v) {
          var out;
          try {
            switch(typeof v) {
              case "function":
                out = v;
                break;
              case "string":
                out = v + " (string)";
                break;
              case "number":
                out = v + " (number)";
                break;
              case "bool":
                out = v + " (bool)";
                break;
              case "undefined":
                out = "(undefined)";
                break;
              default:
                if(v instanceof Date)
                  out = v + " (date)";
                else
                  out = JSON.stringify(v)
            }
          } catch(e) {
            out = v;
          }
          logger.log(out);
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
            return [name, args[0]].concat(args.slice(1));
          },
          methods = [
              { name    : "trigger" }
            , { name    : "provide" }
            , { name    : "on", extract: function(name, args) { return [name, args[0], args[1]]; } }
            , { name    : "one", extract: function(name, args) { return [name, args[0], args[1]]; } }
            , { name    : "off", extract: function(name, args) { return [name, args[0]]; } }
            , { name    : "when", extract: function(name, args) { return [name].concat(args); /*]; */ } }
            , { name    : "request", extract: function(name, args) { return [name].concat(args); } }
            , { name    : "respond", extract: function(name, args) { return [name, args[0]]; } }
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
            return original.apply(ctx, arguments);
          }
        })(methods[i]);
      }

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
