define([
  "jquery",
  "lib/util/dispatcher"
],

function($, createDispatcher) {
  return function(defaultValue, defaultValidator, defaultFilter) {
    var model,
        value = defaultValue,
        validator = defaultValidator || function() { return null;},
        filter = defaultFilter || function(v) { return v;},
        dispatcher = createDispatcher(),
        lastError
    ;

    return model = {
      _set : function(newvalue) {
        var oldvalue = value;
        value = filter(newvalue);
        dispatcher.trigger("value.change", value, oldvalue);
      },
      set : function(newvalue) {
        var test = validator(newvalue);
        if(test && ("object" === typeof test) && test.then) {
          // is a "promise", deal asynchronously
          test.then(function(validationresult) {
            if((lastError = validationresult) != null) {
              dispatcher.trigger("value.validationError", lastError, newvalue);
              return false;
            }
            model._set(newvalue);
          });
          return;
        }
        if((lastError = test) != null) {
          dispatcher.trigger("value.validationError", lastError, newvalue);
          return false;
        }
        model._set(newvalue);
        return true;
      },
      setDefault : function(newvalue) {
        var oldvalue = defaultValue;
        defaultValue = filter(newvalue);
        dispatcher.trigger("default.change", defaultValue, oldvalue);
        this.set(newvalue);
        return true;
      },
      reset : function() {
        if(defaultValue === value) return false;
        if(this.set(defaultValue)) {
          dispatcher.trigger("value.reset", defaultValue);
          return true;
        }
        return false;
      },
      get : function() {
        return value !== null && typeof value !== "undefined" && value;
      },
      getDefault : function() {
        return defaultValue;
      },
      validate : function(value) {
        return validator(value) == null;
      },
      lastError : function() {
        return lastError;
      },
      on : function(type, handler) {
        dispatcher.on(type, handler);
      },
      one : function(type, handler) {
        dispatcher.one(type, handler);
      },
      off : function(type, handler) {
        dispatcher.off(type, handler);
      },
      setValidator : function(newvalidator) {
        validator = newvalidator || function() { return null; };
        dispatcher.trigger("validator.change", validator);
      },
      setFilter : function(newfilter) {
        filter = newfilter || function() { return null; };
        dispatcher.trigger("filter.change", newfilter);
      },
      isDefault : function() {
        return value === defaultValue;
      },
      destroy : function() {
        $(["value.validationError", "value.change", "default.change", "value.reset", "validator.change", "filter.change"]).each(function(){
          dispatcher.off(this);
        });
        lastError = value = defaultValue = filter = validator = dispatcher = null;
      }
    }
  }
});