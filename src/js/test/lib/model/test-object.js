define([
    "lib/model/object"
  , "lib/model/value"
],

function(createObject, createValue) {
  return function() {
    module("Model - Object");

    test("Add/Has/Get/Remove Field", function() {
      var o = createObject(),
          f = createValue();
      ok(!o.hasField("name"));
      o.setField("name", f);
      ok(o.hasField("name"));
      equal(o.getField("name"), f);
      deepEqual(o.fieldNames(), ["name"]);
      o.removeField("name");
      ok(!o.hasField("name"));
    });

    test("Get/Set Value", function() {
      var o = createObject(),
          f = createValue();
      o.setField("name", f);
      ok("undefined" === typeof o.get("name"));
      o.set("name", "Franco");
      equal(o.get("name"), "Franco");
    });

    test("Events", function() {
      var o = createObject(),
          f = createValue();

      var triggered = false;
      o.one("field.add", function(name, field) {
        equal(name, "name");
        equal(field, f);
        triggered = true;
      });
      o.setField("name", f);
      ok(triggered);

      var triggered = false;
      o.one("value.change", function(name, field) {
        equal(name, "name");
        equal(field.get(), "Franco");
        triggered = true;
      });
      o.set("name", "Franco");
      ok(triggered);

      f.setValidator(function(value) { return value.length >= 2 ? null : "too short"; })

      var triggered = false;
      o.one("value.validationError", function(error, name, invalidvalue, field) {
        ok("string" === typeof error);
        equal(name, "name");
        equal(invalidvalue, "F");
        equal(field, f);
        triggered = true;
      });
      o.set("name", "F");
      ok(triggered);

      var triggered = false;
      o.one("field.remove", function(name, field) {
        equal(name, "name");
        equal(field, f);
        triggered = true;
      });
      o.removeField("name");
    });

    test("Reset", function() {
      var o = createObject(),
          f = createValue();
      o.setField("name", f);
      o.set("name", "Franco");
      o.reset();
      ok("undefined" === typeof o.get("name"));
    });

    test("Has Changed", function() {
      var o = createObject(),
        f = createValue();
      o.setField("name", f);
      ok(o.isDefault());
      o.set("name", "Franco");
      ok(!o.isDefault());
    });
  };
});