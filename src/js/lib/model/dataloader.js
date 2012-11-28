define([
    "lib/util/dispatcher"
  , "lib/model/loader/ajax"
],

function(createDispatcher, createAjax) {
  var cache = {};
  return function(options) {
    var aborted = false,
        key,
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
      if(aborted) {
        error("user cancelled");
        return;
      }
      if(!options.nocache)
        cache[key] = data;
      ds.trigger("success", data);
      ds.trigger("complete");
    }

    function error(message) {
      ds.trigger("error", message);
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
        error,
        function(current, total) {
          ds.trigger("progress", current, total)
        }
      );
    };

    ds.abort = function() {
      if(aborted) return;
      aborted = true;
      if(loader.abort) loader.abort();
    };
    return ds;
  };
});