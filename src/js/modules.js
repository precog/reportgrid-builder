define([
    "modules/view/main_view"
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
//  , "modules/service/pardot"
  , "modules/view/error_catcher"
  , "modules/view/brand"
  , "modules/view/theme"
  , "modules/view/datasourcewindow"
//  , "modules/view/thememenu"
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

function() {
  var modules = [];
  for(var i = 0; i < arguments.length; i++) {
    modules.push(arguments[i]);
  }
  return modules;
});