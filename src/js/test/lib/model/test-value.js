define([
    "lib/model/value"
],

function(createValue) {

  function validator(value) {
    return value >= 0 && value <= 10 ? null : "value must be an integer between 0 and 10";
  }

  function filter(value) {
    return value.trim();
  }

  return function() {
    module("Model - Value");

    test("Get/Set", function() {
      var value = createValue();
      ok("undefined" === typeof value.get());
      value.set("hello");
      equal(value.get(), "hello");
      value.reset();
      ok("undefined" === typeof value.get());
    });

    test("Default", function() {
      var value = createValue();

      ok("undefined" === typeof value.getDefault());

      value = createValue("default");
      equal(value.getDefault(), "default");
      equal(value.get(), "default");
      ok(value.isDefault());

      value.set("hello");
      equal(value.get(), "hello");
      ok(!value.isDefault());

      value.setDefault("default2");
      equal(value.getDefault(), "default2");
      ok(value.isDefault());
      equal(value.get(), "default2");

      value.set("hello");
      equal(value.get(), "hello");
      ok(!value.isDefault());
      value.reset();
      ok(value.isDefault());
    });

    test("Validation Set", function() {
      var value = createValue(1, validator);
      ok(!value.set(-1));
      equal(value.get(), 1);
      ok(null !== value.lastError);
    });

    test("Validate", function() {
      var value = createValue();
      ok(value.validate(-1));
      value.setValidator(validator);
      ok(!value.validate(-1));
    });

    test("Events", function() {
      var value    = createValue(1, validator),
          counter  = 0,
          expected = 1;

      function setValue(newvalue, oldvalue) {
        counter++;
        equal(newvalue, 2);
        equal(oldvalue, 1);
      }
      value.on("value.change", setValue);
      value.set(2);
      value.off("value.change", setValue);
      value.reset(); // should not trigger anything

      var triggered = false;
      value.one("value.validationError", function(error, invalidvalue) {
        ok("string" === typeof error);
        equal(invalidvalue, -1);
        triggered = true;
      });
      value.set(-1);
      ok(triggered);

      value.set(2);
      triggered = false;
      value.one("value.reset", function(resetvalue) {
        equal(resetvalue, 1);
        triggered = true;
      });
      value.reset();
      ok(triggered);

      triggered = false;
      value.one("default.change", function(defaultvalue) {
        equal(defaultvalue, 0);
        triggered = true;
      });
      value.setDefault(0);
      ok(triggered);

      triggered = false;
      value.one("validator.change", function(v) {
        equal(validator, v);
        triggered = true;
      });
      value.setValidator(validator);
      ok(triggered);

      triggered = false;
      value.one("filter.change", function(f) {
        equal(filter, f);
        triggered = true;
      });
      value.setFilter(filter);
      ok(triggered);
 
      equal(counter, expected, "not all the expected events have been executed, expected " + expected + ", processed " + counter);
    });

    test("Set Filter", function() {
      var value = createValue();
      value.set(" a ");
      equal(value.get(), " a ");
      value.setFilter(filter);
      value.set(" a ");
      equal(value.get(), "a");
    });

    /*

    validate
    lastError
    on
    off
    setValidator
    setFilter

     */
  };
});