define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
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
    options.push({
      name : "yscaleposition",
      label : "y position",
      event : "options.chart.cartesian.yscaleposition",
      editors : [{
        type : "selection",
        options : {
          selectiontext : false,
          default : "alternating",
          values : [
              { value : "alternating" }
            , { value : "left" }
            , { value : "right" }
          ]
        }
      }]
    });
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