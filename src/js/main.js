requirejs.config({
  shim : {
      'ext/jquery-ui/jquery.ui'         : ['jquery']
    , 'ext/jquery-layout/jquery.layout' : ['ext/jquery-ui/jquery.ui']
    , 'ext/jstree/jstree' : ['ext/jstree/vakata']
    , 'ext/jstree/jstree.sort' : ['ext/jstree/jstree']
    , 'ext/jstree/jstree.themes' : ['ext/jstree/jstree']
    , 'ext/jstree/jstree.ui' : ['ext/jstree/jstree']
    , 'ext/jstree/jstree.dnd' : ['ext/jstree/jstree']
  }
});
require([
    "jquery"
  , "modules/context"
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