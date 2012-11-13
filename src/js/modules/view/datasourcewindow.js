define([
    "jquery"
  , "lib/util/ui"
  , "text!templates/layout.datasource.html"
  , 'ext/jquery-ui/jquery.ui'
  , "ext/jquery-layout/jquery.layout"
],

function($, ui, tplDialog) {
  return function(ctx) {
    var $dialog
//      , $tabs
      ;

    function init() {
      if($dialog) return false;
console.log("??????????????????????????? INIT");
      $dialog = $(tplDialog).appendTo('body')
        .dialog({
            modal : true
          , autoOpen : true
          , resizable : false
          , width : 800
          , height : 600
          , dialogClass : "rg-el"
          , closeOnEscape : true
          , title : "import data"
          , buttons : [{
              text : "Close",
              click : function() {
                $dialog.dialog("close");
                return true;
              }
            }]
          , position : "center"
        });
//      $tabs = $dialog.find(".tabs").tabs();
console.log($dialog.find(".main-container"));
      $dialog.find(".main-container").layout({
          west : {
              size : 240
            , initClosed : false
            , spacing_open: 0
            , spacing_closed: 0
          }
      });
      $dialog.find(".datasources").layout({
        north : {
            resizable : false
          , closable : false
          , slidable : false
          , size: 50
          , spacing_open: 0
          , spacing_closed: 0
        }
      });
      $dialog.find(".main-splitter").layout({
        north : {
            resizable : false
          , closable : false
          , slidable : false
          , size: 200
          , spacing_open: 0
          , spacing_closed: 0
        }
      });

      ctx.trigger("view.data.pane", $dialog.find(".tree"));
      return true;
    }

    ctx.on("view.main.toolbar-context", function(el) {
      ui.button(el, {
          icon : "ui-icon-arrowthickstop-1-n",
          description : "about me"
        }).click(function() {
          if(!init()) {
console.log("REOPEN");
            $dialog.dialog("open");
          }
        });
    });
  };
});