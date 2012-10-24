define([
    "config/chart/extract/extractor"
  , "config/chart/extract/allextract"
  , "config/chart/extract/svgextract"
  , "config/chart/extract/cartesianextract"
  , "config/chart/extract/segmentextract"
  , "config/chart/extract/barchartextract"
],

function(extractor) {
  var extractors = $.makeArray(arguments).slice(1);
  return function() {
    return extractor(extractors);
  };
});