define([
    "lib/util/widget/values/inteditor"
  , "lib/util/widget/values/booleditor"
],

function() {
  var editors = $.makeArray(arguments),
      types   = ["int", "bool"];

  return function(type, el, options) {
    return editors[types.indexOf(type)](el, options);
  };
});