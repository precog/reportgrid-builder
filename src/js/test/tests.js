requirejs.config({
  baseUrl: './js/'
});

require([
    "jquery"
  , "test/test-suite"
  , "test/lib/qunit"
],
function($, suite) {
  $(suite.run);
});