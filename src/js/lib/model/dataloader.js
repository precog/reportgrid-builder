define([
    "lib/util/dispatcher"
  , "lib/model/loader/ajax"
],

function(createDispatcher, createAjax) {
  var cache = {};
  return function(options) {
    var key,
        ds = createDispatcher(),
        loader;

    switch(options.type.toLowerCase()) {
      case "json":
        loader = createAjax(options.src);
        key = "json:"+options.src;
        break;
      default:
        throw "a datasource of type " + options.type + " is not supported (yet)";
    }

    function success(data) {
      if(!options.nocache)
        cache[key] = data;
      ds.trigger("success", data);
      ds.trigger("complete");
    }

    ds.load = function() {
      ds.trigger("loading", ds);
      if(!options.nocache && cache[key]) {
        success(cache[key]);
        return;
      }
      loader(
        success,
        function(error) {
          ds.trigger("error", error);
          ds.trigger("complete");
        },
        function(current, total) {
          ds.trigger("progress", current, total)
        }
      );
    };
    return ds;
  };
});