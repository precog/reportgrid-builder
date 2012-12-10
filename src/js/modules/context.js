define([
  "lib/util/dispatcher"
],
function(createDispatcher) {
  var logger = window.console || {info:function(){}};
  var log = function() {
        logger.groupCollapsed(arguments[0]);
        [new Date().toLocaleTimeString()].concat($.makeArray(arguments).slice(1)).forEach(function(v) {
          logger.info(v);
        });
        logger.groupEnd();
      };

  return function(debug) {
    var ctx = createDispatcher();

    ctx.debug = debug;

    // DEBUG
    if(debug) {
      var trigger = ctx.trigger;
      ctx.counter = {};
      ctx.trigger = function() {
        var type = arguments[0];
        ctx.counter[type] = (ctx.counter[type] || 0) + 1;
        log.apply(window, arguments);
        trigger.apply(ctx, arguments);
      };
      ctx.log = function() {
        log.apply(window, arguments);
      };
    } else {
      ctx.log = function() {};
    }

    return ctx;
  };
});
