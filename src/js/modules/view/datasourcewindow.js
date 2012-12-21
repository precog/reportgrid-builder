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
      $dialog.find(".main-container").layout({
          west : {
              size : 240
            , initClosed : false
            , resizable : false
//            , spacing_open: 0
//            , spacing_closed: 0
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

      ctx.provide("view.data.tree", $dialog.find(".tree"));
      ctx.provide("view.data.toolbar-description", $dialog.find(".datasources .toolbar-description"));
      ctx.provide("view.data.toolbar-main", $dialog.find(".datasources .toolbar-main"));
      ctx.provide("view.data.toolbar-context", $dialog.find(".datasources .toolbar-context"));

      ctx.provide("view.data.datasource", $dialog.find(".datasource"));
      ctx.provide("view.data.dataviewer", $dialog.find(".dataviewer"));

      return true;
    }

    ctx.one("view.main.toolbar-context", function(el) {
      ui.button(el, {
          icon : "ui-icon-arrowthickstop-1-n",
          description : "import/manage data sources"
        }).click(function() {
          if(!init()) {
            $dialog.dialog("open");
          }
        });
    });
  };
});