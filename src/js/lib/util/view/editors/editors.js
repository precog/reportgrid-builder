define([
    "lib/util/view/editors/floateditor"
  , "lib/util/view/editors/inteditor"
  , "lib/util/view/editors/booleditor"
  , "lib/util/view/editors/expressioneditor"
  , "lib/util/view/editors/stringeditor"
  , "lib/util/view/editors/texteditor"
  , "lib/util/view/editors/selectioneditor"
  , "lib/util/view/editors/templateeditor"
  , "lib/util/view/editors/rgcsseditor"
  , "lib/util/view/editors/coloreditor"
  , "lib/util/view/editors/colorlisteditor"
  , "lib/util/view/editors/fileeditor"
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