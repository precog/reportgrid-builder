define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

console.log(JSON.stringify(preferences));

    options.push({
      name  : "displayrules",
      label : "display rules",
      event : "options.chart.cartesian.displayrules",
      editors : [{
        type  : "bool",
        options : {
          default : false
        }
      }, {
        type  : "expression",
        options : {
          default : ""
        }
      }]
    });

    if(!preferences.hidey) {
      var values = [
          { value : "left" }
        , { value : "right" }
      ];
      if(!preferences.singley) {
        values.unshift({ value : "alternating" });
      }
      options.push({
        name : "yscaleposition",
        label : "y position",
        event : "options.chart.cartesian.yscaleposition",
        editors : [{
          type : "selection",
          options : {
            selectiontext : false,
            default : values[0],
            values  : values
          }
        }]
      });
    }
    options.push({
      name  : "labelhorizontal",
      group : "label",
      label : "horizontal",
      event : "options.chart.labelhorizontal",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }]
    });
  }
});