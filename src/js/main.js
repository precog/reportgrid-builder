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
  , "modules/model/context"
  , "modules/model/config"
  , "modules/model/datatree"
  , "modules/view/theme"
  , "modules/view/thememenu"
  , "modules/view/layout"
  , "modules/view/editor/tabs"
  , "modules/view/datapane"
  , "modules/view/editorpane"
  , "modules/view/chartselector"
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