define([

],

function() {
  return function(datasource) {
    return 'ReportGrid.request("'+datasource.src+'")';
  };
});