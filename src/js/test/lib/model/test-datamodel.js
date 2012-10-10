define([
    "lib/model/datamodel"
  , "lib/util/arrays"
],

function(create, arrays) {
  return function() {
    module("Data Model");

    test("Constructor", function() {
      var dm = create([{ name : "name", column : {} }]);
      ok(!!dm.column("name"));
      ok(!dm.column("fake"));
    });

    test("Column Added Event", function() {
      var dm = create(),
          column = {},
          counter = 0;
      $(dm).on("added", function(e, name, col, d) {
        equal(name, "name", "same column name");
        equal(col, column, "right column is passed in the event listener");
        equal(dm, d, "right datasource is passed in the event listener");
        counter++;
      });
      dm.column("name", column);
      equal(counter, 1, "1 listener")
    });

    test("Column Removed Event", function() {
      var dm = create(),
          column = {},
        counter = 0;
      $(dm).on("removed", function(e, name, col, d) {
        equal(name, "name", "same column name");
        equal(col, column, "right column is passed in the event listener");
        equal(dm, d, "right datasource is passed in the event listener");
        counter++;
      });
      dm.column("name", column);
      dm.column("name", null);
      equal(counter, 1, "1 listener")
    });

    test("Column Names", function() {
      var dm = create([{ name : "name", column : {} }]),
          names = dm.names();
      equal(names.length, 1, "one column in the model");
      equal(names[0], "name", "column name is 'name'");
    });
  };
});