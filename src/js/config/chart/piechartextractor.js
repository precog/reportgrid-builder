define([
    "config/chart/extract/extractor"
  , "config/chart/extract/allextract"
  , "config/chart/extract/svgextract"
],

function(extractor) {
  var extractors = $.makeArray(arguments).slice(1);
  return function() {
    return extractor(extractors);
  };
});