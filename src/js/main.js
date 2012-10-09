requirejs.config({
  shim : {
      'lib/jquery-ui/jquery.ui'         : ['jquery']
    , 'lib/jquery-layout/jquery.layout' : ['lib/jquery-ui/jquery.ui']
    , 'lib/jstree/jstree' : ['lib/jstree/vakata']
    , 'lib/jstree/jstree.sort' : ['lib/jstree/jstree']
    , 'lib/jstree/jstree.themes' : ['lib/jstree/jstree']
    , 'lib/jstree/jstree.ui' : ['lib/jstree/jstree']
    , 'lib/jstree/jstree.dnd' : ['lib/jstree/jstree']
  }
});
require([
    "jquery"
  , "model/context"
  , "model/config"
  , "model/datatree"
  , "view/theme"
  , "view/thememenu"
  , "view/layout"
  , "view/editor/tabs"
  , "view/datapane"
  , "view/editorpane"
  , "view/chartselector"
],
function($, createContext) {
  var modules = $(arguments).slice(2);

  function builder() {
    var ctx = createContext();

    $(modules).each(function() {
      this(ctx);
    });

    ctx.trigger("modules.loaded");
    ctx.trigger("view.container.ready", $(this));
    ctx.trigger("app.ready");

    // DEBUG
    window.ctx = ctx;
  }

  $(function() {
    var selection = $("body");
    selection.each(builder);
  });
});