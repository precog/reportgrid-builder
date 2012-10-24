define([
    "lib/util/widget/values/inteditor"
  , "lib/util/widget/values/booleditor"
  , "lib/util/widget/values/expressioneditor"
  , "lib/util/widget/values/stringeditor"
],

function() {
  var editors = $.makeArray(arguments),
      types   = ["int", "bool", "expression", "string"];

  return function(type, el, options) {
    return editors[types.indexOf(type)](el, options);
  };
});