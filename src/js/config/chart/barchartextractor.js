define([
    "config/chart/extract/extractor"
  , "config/chart/extract/allextract"
  , "config/chart/extract/segmentextract"
  , "config/chart/extract/barchartextract"
],

function(extractor) {
  return function() {
    return extractor($.makeArray(arguments).slice(1));
  };
});