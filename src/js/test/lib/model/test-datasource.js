define([
    "lib/model/datasource"
  , "lib/util/arrays"
],

  function(create, arrays) {
    var loaderSucceeds = true,
        loader = function(success, error, progress) {
          if(loaderSucceeds) {
            progress(1, 2);
            success([1, 2, 3]);
          } else {
            error("error message");
          }
        };

    return function() {
      module("Data Source");

      test("Data Loading Success", function() {
        var ds = create(loader);

        loaderSucceeds = true;
        var triggered = 0;
        ds.one("success", function(result) {
          triggered++;
          deepEqual(result, [1,2,3]);
        });
        ds.one("progress", function(current, total) {
          triggered++;
          equal(current, 1);
          equal(total, 2);
        });
        ds.one("error", function() {
          ok(false, "error invoked on success");
        });
        ds.load();
        ok(triggered === 2, "success handler executed on success");

      });

      test("Data Loading Error", function() {
        var ds = create(loader);

        var triggered = 0;
        loaderSucceeds = false;
        triggered = 0;
        ds.one("success", function() {
          ok(false, "success handler executed on error");
        });
        ds.one("error", function(error) {
          equal(error, "error message", "expected and result match");
          triggered++;
        });
        ds.load();
        ok(triggered, "error handler executed on error");
      });

      asyncTest("Data Loading from String", function() {
        var ds = create("data/iris.json");
        ds.one("success", function(data) {
          ok(data.length > 0);
          start();
        });
        ds.load();
      });
    };
  });