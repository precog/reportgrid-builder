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
  , "http://localhost/rg/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
  , "modules/view/debugger"
  , "modules/model/version"
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
  , "modules/service/pardot"
  , "modules/view/error_catcher"
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
  var modules = $(arguments).slice(3);

  function builder() {
    var ctx = createContext();

    $(modules).each(function() {
      this(ctx);
    });

    // TODO add module for global error handling (window.onerror or $(window).error)
    // TODO remove this
    ctx.trigger("modules.ready");

    // TODO move this to a module
    ctx.trigger("view.container.ready", $(this));
    // TODO remove this
    ctx.trigger("app.ready");

    window.ReportGrid.builder = ctx;
  }

  // TODO move this to a module
  $(function() {
    var selection = $("body");
    selection.each(builder);
  });
});