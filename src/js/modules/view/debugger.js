define([
  "lib/util/consoledebugger"
],
function(debugObject) {
  return function(ctx) {
    var dbg = debugObject(
      ctx,
      ["trigger", "provide", /*"on", "one", "off", "when", "request",*/ "respond"],
      {
        on      : "#f6f6f6",
        one     : "#eaeaea",
        off     : "#ffe0e0",
        trigger : "#eff",
        request : "#fef",
        respond : "#ffe",
        provide : "#efe",
        chart   : "#9fd",
        error   : "#f93",
        assert  : ["#f30","#fff"]
      });

    ctx.assert = function(condition, message) {
      if(!condition)
        ctx.log.apply(ctx, ["assert"].concat(Array.prototype.slice.call(arguments, 1)));
    };
    ctx.log = dbg.log;
    ctx.counter = dbg.counter;
  };
});