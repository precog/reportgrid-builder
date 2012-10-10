define([
  "lib/model/object"
],

function(createObject) {

  return function() {
    module("Model - Object");

    test("Add/Has/Get/Remove Field", function() {
      //addField -> setField (check for existing field?)
      //removeField
      //hasField
      //getField

    });

    test("Get/Set Value", function() {
      //get,set
    });

    test("Is Valid", function() {
      //isValid
    });

    test("Reset", function() {
      //reset
    });

    test("Has Changed", function() {
      //hasChanged -> isDefault
    });
  };
});