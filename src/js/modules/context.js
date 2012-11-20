define([
  "lib/util/dispatcher"
],
function(createDispatcher) {
  return function(debug) {
    var ctx = createDispatcher();

    ctx.debug = debug;

    // DEBUG
    if(debug) {
      var trigger = ctx.trigger;
      ctx.counter = {};
      ctx.trigger = function(type) {
        var args = $.makeArray(arguments).slice(1);
        ctx.counter[type] = (ctx.counter[type] || 0) + 1;
        console.info.apply(console, [new Date().toLocaleTimeString(), type].concat(args));
        trigger.apply(ctx, arguments);
      };
    }

    return ctx;
  };
});
