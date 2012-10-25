define([
    "lib/util/widget/values/inteditor"
  , "lib/util/widget/values/booleditor"
  , "lib/util/widget/values/expressioneditor"
  , "lib/util/widget/values/stringeditor"
  , "lib/util/widget/values/selectioneditor"
],

function() {
  var editors = $.makeArray(arguments),
      types   = ["int", "bool", "expression", "string", "selection"];

  return function(type, el, options) {
    return editors[types.indexOf(type)](el, options);
  };
});