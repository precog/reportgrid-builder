define([
    "jquery"
  , "lib/util/dispatcher"
],

function($, createDispatcher) {

  return function(loader) {
    var ds = createDispatcher();

    ds.setLoader = function(handler) {
      loader = handler;
      return this;
    };

    ds.load = function() {
      ds.trigger("loading", [ds]);
      loader(
        function(data) {
          ds.trigger("success", data);
          ds.trigger("complete");
        },
        function(error) {
          ds.trigger("error", error);
          ds.trigger("complete");
        },
        function(current, total) {
          ds.trigger("progress", current, total)
        }
      );
    };

    if("string" === typeof loader) {
      var path = loader;
      ds.setLoader(loader = function(success, error, progress) {
        $.ajax({
            url : path,
            beforeSend : function(xhr) {
              if(xhr.addEventListener && progress) {
                xhr.addEventListener("progress", function(evt) {
                  if(evt.lengthComputable) {
                    progress(evt.loaded, evt.total);
                  }
                });
              }
            },
            success : function(data, textStatus, xhr) {
              success(data);
            },
            error : function(xhr, textStatus, errorThrown) {
              success(data);
            }
          })
        ;
      });
    } else if(loader) {
      ds.setLoader(loader);
    }

    return ds;
  };
});