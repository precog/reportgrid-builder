define([
    "config/chart/extract/extractor"
  , "config/chart/extract/allextract"
],

function(extractor) {
  var extractors = $.makeArray(arguments).slice(1);
  return function() {
    return extractor(extractors);
  };
});