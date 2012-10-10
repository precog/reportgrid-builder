define([
    "jquery"
  , "test/lib/model/test-filesystem"
  , "test/lib/model/test-datasource"
  , "test/lib/model/test-datamodel"
],

function($) {
  var modules = $(arguments).slice(1);
  return {
    run : function() {
      $(function() {
        for(var i = 0; i < modules.length; i++) {
          var module = modules[i];
          module();
        }

      })
    }
  }
});