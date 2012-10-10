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
console.log("set value", counter);
        counter++;
        equal(newvalue, 2);
        equal(oldvalue, 1);
      }
      value.on("value.change", setValue);
console.log("before 1");
      value.set(2);
console.log("after 1");
      value.off("value.change", setValue);
console.log("before 2");
      value.reset(); // should not trigger anything
console.log("after 2");

      //on,off
      //value.validationError
      //value.change
      //default.change
      //value.reset
      //validator.change
      //filter.change
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