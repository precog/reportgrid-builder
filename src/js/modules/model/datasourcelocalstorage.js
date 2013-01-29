define([
  "lib/util/store"
],

function(createStore) {
  var STORE_NAME = "RGBUILDER:DATASOURCES",
      store = createStore(STORE_NAME, { list : [] });

  return function(ctx) {
    var list = store.get("list"),
      initiallyEmpty = list.length === 0;
    ctx.respond("datasource.localstorage.hasdata", function() {
      return !initiallyEmpty;
    });
    ctx.provide("datasource.localstorage.ready", true);

    setTimeout(function(){
      // TODO the loading code should not be here
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
    }, 200);

    ctx.on("datasource.localstorage.clear", function() {
      store.destroy();
    });
  };
});