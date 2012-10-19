define([
  "lib/util/dispatcher"
],

function(createDispatcher) {
  return function(defaultValue, defaultValidator, defaultFilter) {
    var model,
        value = defaultValue,
        validator = defaultValidator || function() { return null;},
        filter = defaultFilter || function(v) { return v;},
        dispatcher = createDispatcher(),
        lastError
    ;

    return model = {
      set : function(newvalue) {
console.log("SET", newvalue, validator(newvalue));
        if((lastError = validator(newvalue)) != null) {
console.log("TRIGGERS ERROR", lastError);
          dispatcher.trigger("value.validationError", lastError, newvalue);
          return false;
        }
        var oldvalue = value;
        value = filter(newvalue);
        dispatcher.trigger("value.change", value, oldvalue);
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
      get : function(alt) {
        return value !== null && typeof value !== "undefined" && value || alt;
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
      }
    }
  }
});