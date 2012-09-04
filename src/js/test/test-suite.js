define([
    "jquery"
  , "test/model/test-filesystem"
  , "test/model/test-datasource"
  , "test/model/test-datamodel"
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