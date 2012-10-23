define([
    "config/chart/pivottableextractor"
  , "config/chart/pivottableoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "pivottable"
    , label : "Pivot Table"
    , extractOptions : extractor()
    , dimensions : [{
      name : "columns",
      isaxis : true,
      min  : 1,
      max  : null
    }, {
      name : "rows",
      isaxis : true,
      min  : 1,
      max  : null
    }, {
      name : "value",
      isaxis : true,
      min  : 1,
      max  : null
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});

// TODO ignoring column/row position