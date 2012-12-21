define([
    "jquery"
  , "lib/util/dispatcher"
],

function($, createDispatcher) {

  return function() {
    module("Dispatcher");

    test("On/Off", function() {
      var dispatcher = createDispatcher(),
          executions = 0,
          expected   = 1;

      function handler(value1, value2) {
        executions++;
        equal(value1, "a");
        equal(value2, "b");
      }

      dispatcher.on("event", handler);
      dispatcher.trigger("event", "a", "b");
      dispatcher.off("event", handler);
      dispatcher.trigger("event", "a", "b");

      equal(executions, expected);
    });

    test("One", function() {
      var dispatcher = createDispatcher(),
          executions = 0,
          expected   = 1;
      function handler() {
        executions++;
      }

      dispatcher.one("event", handler);
      dispatcher.trigger("event");
      dispatcher.trigger("event");

      equal(executions, expected);
    });

    test("When", function() {
      var dispatcher = createDispatcher(),
          executions = 0,
          expected   = 1;
      function handler(a, b) {
        equal(a[0], "a");
        equal(b[0], "b");
        executions++;
      }

      dispatcher.when("A", "B").then(handler);
      dispatcher.trigger("B", "b");
      dispatcher.trigger("A", "a");
      equal(executions, expected);
    });

    asyncTest("Data Loading from String", function() {
      setTimeout(function(){
        ok(true);
        start();
      }, 1000);
    });
    // test request/respond

    // test provide with on

    // test provide with one

    // test provide with when
  };
});