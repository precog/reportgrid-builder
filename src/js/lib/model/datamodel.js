define([
],

  function() {

    return function(columns) {
      var dm,
          map = {};

      dm = {
        column : function(name, column) {
          if("undefined" === typeof column) {
            return map[name];
          } else if(null === column) {
            column = map[name];
            delete map[name];
            $(dm).trigger("removed", [name, column, dm]);
            return this;
          } else {
            if(map[name]) {
              this.column(name, null);
            }
            map[name] = column;
            $(dm).trigger("added", [name, column, dm]);
            return this;
          }
        },
        names : function() {
          var result = [];
          for(var key in map) {
            if(map.hasOwnProperty(key)) {
              result.push(key);
            }
          }
          return result;
        }
        // added, removed
      };

      if(columns) {
        for(var i = 0; i < columns.length; i++) {
          dm.column(columns[i].name, columns[i].column);
        }
      }

      return dm;
    };
  });