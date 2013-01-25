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
    "modules/context"
  , "modules-build"
  , "//api.reportgrid.com/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
],
function(createContext, modules) {
  window.ReportGrid.builder = createContext(modules);
});