define([
  "lib/util/dispatcher"
],
function(createDispatcher) {
  var logger = window.console || {info:function(){}};
  var log = function() {
        logger.group(arguments[0]);
        logger.info.apply(logger, [new Date().toLocaleTimeString()].concat($.makeArray(arguments).slice(1)));
        logger.groupEnd(arguments[0])
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
    }

    return ctx;
  };
});
