define([
    "lib/model/datasource"
  , "lib/util/arrays"
],

  function(create, arrays) {
    var loaderSucceeds = true,
        loader = function(success, error) {
          if(loaderSucceeds) {
            success([1, 2, 3]);
          } else {
            error("error message");
          }
        };

    return function() {
      module("Data Source");

      test("Constructor", function() {
        var ds = create(loader, [{ name : "name", column : {} }]);
        ok(!!ds.loader());
      });

      test("Data Loading with Direct Callbacks", function() {
        var ds = create(loader);
        loaderSucceeds = true;
        ds.load(
          function(result) {
            ok(true, "success handler executed on success");
            equal(arrays.diff(result, [1 ,2 ,3]).length, 0, "expected and result match");
          },
          function(error) {
            ok(false, "error handler executed on success");
          });
        loaderSucceeds = false;
        ds.load(
          function(result) {
            ok(false, "success handler executed on error");
          },
          function(error) {
            ok(true, "error handler executed on error");
            equal(error, "error message", "expected and result match");
          });
      });

      test("Data Loading with Events", function() {
        var ds = create(loader);
        loaderSucceeds = true;
        $(ds).on("data", function(e, data, d) {
          equal(arrays.diff(data, [1 ,2 ,3]).length, 0, "expected and result match");
          equal(d, ds, "same datasource is passed as the third argument");
        });
        $(ds).on("error", function(e, error, d) {
          ok(false, "error handler executed on success");
          equal(d, ds, "same datasource is passed as the third argument");
        });
        ds.load();

        var ds = create(loader);
        loaderSucceeds = false;
        $(ds).on("data", function(e, data, d) {
          ok(false, "success handler executed on error");
          equal(d, ds, "same datasource is passed as the third argument");
        });
        $(ds).on("error", function(e, error, d) {
          equal(error, "error message", "expected and result match");
          equal(d, ds, "same datasource is passed as the third argument");
        });
        ds.load();
      });
    };
  });