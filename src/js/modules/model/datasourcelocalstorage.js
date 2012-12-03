define([
  "lib/util/store"
],

function(createStore) {
  var STORE_NAME = "RGBUILDER:DATASOURCES",
      store = createStore(STORE_NAME, { list : [] });

  return function(ctx) {
    ctx.on("request.datasource.localstorage.hasdata", function() {
      var list = store.get("list"),
          initiallyEmpty = list.length === 0;
      for(var i = 0; i < list.length; i++) {
        ctx.trigger("data.datasource.add", list[i]);
      }

      ctx.on("data.datasource.add", function(ds) {
        list.push(ds);
        store.delayedCommit();
      });

      ctx.on("data.datasource.remove", function(ds) {
        for(var i = 0; i < list.length; i++) {
          if(list[i].path === ds.path) {
            list.splice(i, 1);
            store.delayedCommit();
            break;
          }
        }
      });

      ctx.trigger("response.datasource.localstorage.hasdata", !initiallyEmpty);
    });
  };
});