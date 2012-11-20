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
  , "modules/model/examples"
  , "modules/model/dimensionstyper"
  , "modules/model/chartbuilder"
  , "modules/model/datasourcebroker"
  , "modules/model/datasourcefilesystem"
  , "modules/view/theme"
  , "modules/view/datasourcewindow"
  , "modules/view/thememenu"
  , "modules/view/layout"
  , "modules/view/editor/tabs"
  , "modules/view/editorpane"
  , "modules/view/chartselector"
  , "modules/view/datasourceselector"
  , "modules/view/datasourcepreview"
  , "modules/view/dimensionspane"
  , "modules/view/optionspane"
  , "modules/view/chartpane"
  , "modules/view/changergtheme"
  , "modules/view/datasourcetree"
],
function($, createContext) {
  var modules = $(arguments).slice(2);

  function builder() {
    var ctx = createContext(true);

    $(modules).each(function() {
      this(ctx);
    });

    ctx.trigger("modules.ready");
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