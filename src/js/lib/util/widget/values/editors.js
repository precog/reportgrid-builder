define([
    "lib/util/widget/values/floateditor"
  , "lib/util/widget/values/inteditor"
  , "lib/util/widget/values/booleditor"
  , "lib/util/widget/values/expressioneditor"
  , "lib/util/widget/values/stringeditor"
  , "lib/util/widget/values/selectioneditor"
  , "lib/util/widget/values/templateeditor"
],

function() {
  var editors = $.makeArray(arguments),
      types   = ["float", "int", "boolean", "expression", "string", "selection", "template"];

  return {
    create : function(el, type, options){
      return editors[types.indexOf(type)](el, options);
    }
  };
});