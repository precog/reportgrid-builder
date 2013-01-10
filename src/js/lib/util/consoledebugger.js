define([
  "jquery"
  , "lib/util/dispatcher"
],
function($, createDispatcher) {
  var logger = window.console || {log:function(){}};

  return function(obj, methods, colors) {
    methods = methods || [];
    colors = colors || {};
    var log = function() {
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
                    out = JSON.stringify(v) + " (object)"
              }
            } catch(e) {
              out = v;
            }
            logger.log(out);
          });
          logger.groupEnd();
        },
        counter = {},
        generic_extractor = function(name, args) {
          return [name, args[0]].concat(args.slice(1));
        };

    for(var i = 0; i < methods.length; i++) {
      (function(method) {
        method = "string" === typeof method ? { name : method } : method;
        var name     = method.name,
            extract  = method.extract || generic_extractor,
            original = obj[name];
        obj[name] = function() {
          var args = extract(name, $.makeArray(arguments));
          var type = (obj.counter[args[0]] || (obj.counter[args[0]] = {}));
          type[args[1]] = (type[args[1]] || 0) + 1;
          log.apply(window, args);
          return original.apply(obj, arguments);
        }
      })(methods[i]);
    }

    return {
      log : function() {
        log.apply(window, arguments);
      },
      counter : function() {
        return counter;
      }
    };
  };
});
