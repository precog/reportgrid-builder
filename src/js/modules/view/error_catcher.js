define([

],

function() {
  return function(ctx) {
    var old = window.onerror;

    window.onerror = function(msg, url, lineNumber) {
      ctx.trigger("application.error", {
        message : msg,
        url : url,
        lineNumber : lineNumber
      });
      if(old)
        return old(msg, url, lineNumber);
      return false;
    };
  };
});