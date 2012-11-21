define([
    "lib/util/widget/values/floateditor"
  , "lib/util/widget/values/inteditor"
  , "lib/util/widget/values/booleditor"
  , "lib/util/widget/values/expressioneditor"
  , "lib/util/widget/values/stringeditor"
  , "lib/util/widget/values/texteditor"
  , "lib/util/widget/values/selectioneditor"
  , "lib/util/widget/values/templateeditor"
  , "lib/util/widget/values/rgcsseditor"
  , "lib/util/widget/values/coloreditor"
  , "lib/util/widget/values/colorlisteditor"
  , "lib/util/widget/values/fileeditor"
],

function() {
  var editors = $.makeArray(arguments),
      types   = ["float", "int", "boolean", "expression", "string", "text", "selection", "template", "rgcss", "color", "colorlist", "file"];

  return {
    create : function(el, type, options){
       var index = types.indexOf(type);
      if(index < 0)
        throw "There is no editor for '" + type + "'";
      return editors[index](el, options);
    }
  };
});