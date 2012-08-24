define([
    "jquery"
  , "test/model/test-filesystem"
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