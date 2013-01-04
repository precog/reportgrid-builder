define([],
function() {
  return function(name, o) {
    return o[name] || (o[name] = {});
  };
});