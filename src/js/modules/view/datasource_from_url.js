define([
    "lib/util/querystring"
  , "lib/util/auto-increment-name"
  , "lib/model/dataloader"
  , "lib/model/guesser_modeltype"
  , "lib/model/value_equality"
],

function(qs, auto_increment, create_loader, guess, value_equality) {

  function create_datasource(ctx, path, type, src, existingds) {
    var loader = create_loader({
      type : type,
      src  : src
    });
    loader.on("success", function(data) {
      var fields = guess.list(data);

      if(existingds) {
        path = auto_increment(path);
        ctx.request("datasource.path.validate", path, function(response) {
          if(response.valid) {
            create_datasource(ctx, path, type, src, false);
          } else {
            process_datasource(ctx, path, type, src);
          }
        });
      } else {
        ctx.trigger("data.datasource.add", {
          path   : path,
          name   : path.split("/").pop(),
          type   : type,
          src    : src,
          fields : fields
        });
      }
    });
    loader.on("error", function(msg) {
      ctx.log("error", msg);
    });
    loader.load();
  }

  function datasources_match(a_type, b_type, a_src, b_src) {
    if(a_type !== b_type)
      return false;
    return value_equality(a_src, b_src);
  }

  function process_datasource(ctx, path, type, src) {
    ctx.request("data.datasource.request", path, function(ds) {
      if(false !== ds && datasources_match(ds.type, type, ds.src, src)) {
        return;
      }
      create_datasource(ctx, path, type, src, ds !== false);
    });
  }

  return function(ctx) {
    setTimeout(function() {

      var src = qs.get("data-source");
      if(!src) return;

      var name = qs.get("data-name") || "unnamed",
          type = qs.get("data-type") || "url";

      if(name.substr(0, 1) !== "/")
        name = "/" + name;

      ctx.request("datasource.path.sanitize", name, function(path) {
        process_datasource(ctx, path, type, src);
      });

    }, 0);
  };
});