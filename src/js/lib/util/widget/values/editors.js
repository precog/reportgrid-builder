define([
    "lib/util/widget/values/inteditor"
  , "lib/util/widget/values/stringeditor"
],

function() {
  var editors = $.makeArray(arguments),
      types   = ["int", "string"];

  return function(type, el, options) {
    return editors[types.indexOf(type)](el, options);
  };
});