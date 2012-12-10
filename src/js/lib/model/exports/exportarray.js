define([

],

function() {
  return function(datasource) {
    return "ReportGrid.query.data("+JSON.stringify(datasource.src)+")";
  };
});