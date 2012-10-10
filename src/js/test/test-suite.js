define([
    "jquery"
  , "test/lib/model/test-object"
  , "test/lib/model/test-value"
  , "test/lib/model/test-filesystem"
  , "test/lib/model/test-datasource"
],

function($) {
  var modules = $(arguments).slice(1);
  return {
    run : function() {
      $(function() {
        for(var i = 0; i < modules.length; i++) {
          modules[i]();
        }
      });
    }
  }
});