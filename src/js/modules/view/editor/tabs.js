define([
    "jquery"
  , "lib/util/ui"
],

function($, ui) {
  return function(ctx) {
    var tabs, context;


    function init() {
      tabs.on({
        click : function(){
          var index = $("li", tabs).index($(this).parent());
          editors.remove(index);
        }
      }, '.ui-icon-close');

      tabs.on({
        click : function() {
          var index = $("li", tabs).index($(this).parent());
          editors.activate(index);
        }
      }, 'li a');
/*
      ui.button(context, {
        icon : "ui-icon-disk"
      });
*/
      // fake
      tabs.tabs("add", "#pg-editor-tab", "hello world");
    }

    ctx.on("view.editor.tabs", function(el) {
      tabs = ui.tabs($(el), {
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close pg-tab-close'>Remove Tab</span></li>",
        add: function(event, ui) {
          var index = ui.index;
        }
      });
    });
    ctx.on("view.editor.toolbar-context", function(el) {
      context = $(el);
    });
    $.when(ctx.on("view.editor.tabs"), ctx.on("view.editor.toolbar-context")).then(init);
  };
});