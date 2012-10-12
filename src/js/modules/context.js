define([
  "lib/util/dispatcher"
],
function(createDispatcher) {
  return function() {
    var ctx = createDispatcher();

    // DEBUG
    var trigger = ctx.trigger;
    ctx.trigger = function(type) {
      var args = $.makeArray(arguments).slice(1).map(function(v) {
            try {
              return JSON.stringify(v);
            } catch(e) {
              return v;
            }
          });
      console.info.apply(console, [new Date().toLocaleTimeString(), type].concat(args));
      trigger.apply(ctx, arguments);
    };

    return ctx;
  };
});
