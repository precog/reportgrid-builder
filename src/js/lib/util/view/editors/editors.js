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
  , "lib/util/view/editors/variableeditor"
],

function() {
  var types = ["float", "int", "boolean", "expression", "string", "text", "selection", "template", "rgcss", "color", "colorlist", "file", "variable"],
      map   = {};

  for(var i = 0; i < types.length; i++) {
    map[types[i]] = arguments[i];
  }

  return {
    create : function(el, type, options, ctx){
      if(!map[type])
        throw "There is no editor for '" + type + "'";
      var editor = map[type](el, options, ctx);
      if(ctx) {
        $(editor).on("user_change", function(value) {
          ctx.trigger("user.chart.option", options, value);
        });
      }
      return editor;
    }
  };
});