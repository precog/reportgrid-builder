requirejs.config({
  baseUrl: './js/'
});

require([
    "jquery"
  , "test/test-suite"
  , "test/ext/qunit"
],
function($, suite, a) {
  $(suite.run);
});