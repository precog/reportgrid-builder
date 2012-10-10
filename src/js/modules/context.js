define([
  "lib/util/dispatcher"
],
function(createDispatcher) {
  return function() {
    var ctx = createDispatcher();
    return ctx;
  };
});
