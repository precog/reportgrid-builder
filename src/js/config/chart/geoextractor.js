define([
    "config/chart/extract/extractor"
  , "config/chart/extract/allextract"
  , "config/chart/extract/svgextract"
  , "config/chart/extract/geoextract"
],

function(extractor) {
  var extractors = $.makeArray(arguments).slice(1);
  return function() {
    return extractor(extractors);
  };
});