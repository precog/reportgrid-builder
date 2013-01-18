requirejs.config({
  shim : {
      'ext/jquery-ui/jquery.ui'         : ['jquery']
    , 'ext/jquery-layout/jquery.layout' : ['ext/jquery-ui/jquery.ui']
    , 'ext/jstree/jstree'               : ['ext/jstree/vakata']
    , 'ext/jstree/jstree.sort'          : ['ext/jstree/jstree']
    , 'ext/jstree/jstree.themes'        : ['ext/jstree/jstree']
    , 'ext/jstree/jstree.ui'            : ['ext/jstree/jstree']
    , 'ext/jstree/jstree.dnd'           : ['ext/jstree/jstree']
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
  , "modules/model/datasourcelocalstorage"
  , "modules/model/reportsbroker"
  , "modules/model/reportsfilesystem"
  , "modules/model/reportslocalstorage"
  , "modules/model/chartstate"
//  , "modules/service/pardot"
  , "modules/view/brand"
  , "modules/view/theme"
  , "modules/view/datasourcewindow"
  , "modules/view/thememenu"
  , "modules/view/layout"
  , "modules/view/editorpane"
  , "modules/view/chartselector"
  , "modules/view/datasourceselector"
  , "modules/view/datasourcepreview"
  , "modules/view/datasourceedit"
  , "modules/view/datasourcetreeactions"
  , "modules/view/reportstreeactions"
  , "modules/view/reportsdownloadupload"
  , "modules/view/dimensionspane"
  , "modules/view/optionspane"
  , "modules/view/chartpane"
  , "modules/view/changergtheme"
  , "modules/view/datasourcetree"
  , "modules/view/reportstree"
  , "modules/view/exporthtml"
  , "modules/view/reportname"
],
function($, createContext) {
  var modules = $(arguments).slice(2);

  function builder() {
    var ctx = createContext();

    $(modules).each(function() {
      this(ctx);
    });

    ctx.trigger("modules.ready");
    ctx.trigger("view.container.ready", $(this));
    ctx.trigger("app.ready");

    window.ReportGrid.builder = ctx;
  }

  $(function() {
    var selection = $("body");
    selection.each(builder);
  });
});