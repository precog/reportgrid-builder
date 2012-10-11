define([
  "lib/util/dispatcher"
],

function(createDispatcher) {
  return function() {
    var map = {},
        dispatcher = createDispatcher(),
        model;

    return model = {
      setField : function(name, field) {
        this.removeField(name);
        map[name] = { field : field };
        field.on("value.change", map[name].valueChange = function() {
          dispatcher.trigger("value.change", name, field);
        });
        field.on("value.validationError", map[name].validationError = function(error, value) {
          dispatcher.trigger("value.validationError", error, name, value, field);
        });
        dispatcher.trigger("field.add", name, field);
      },
      removeField : function(name) {
        if(!this.hasField(name)) return false;
        var field = map[name].field;

        field.off("value.validationError", map[name].validationError);
        field.off("value.change", map[name].valueChange);

        delete map[name];
        dispatcher.trigger("field.remove", name, field);
      },
      hasField : function(name) {
        return !!map[name];
      },
      getField : function(name) {
        return map[name].field;
      },
      get : function(name) {
        var field = this.getField(name);
        if(null == field)
          return null;
        return field.get();
      },
      set : function(name, value) {
        var field = this.getField(name);
        if(null == field)
          return false;
        return field.set(value);
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
      reset : function() {
        for(name in map) {
          if(map.hasOwnProperty(name)) {
            map[name].field.reset();
          }
        }
      },
      fieldNames : function() {
        var names = [];
        for(name in map) {
          if(map.hasOwnProperty(name)) {
            names.push(name);
          }
        }
        return names;
      },
      isDefault : function() {
        for(name in map) {
          if(map.hasOwnProperty(name) && !map[name].field.isDefault()) {
            return false;
          }
        }
        return true;
      }
    };
  }
});