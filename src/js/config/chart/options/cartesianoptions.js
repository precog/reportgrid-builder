define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

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
        group : "axis",
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
      name  : "axis",
      event : "options.chart.label.axis",
      group : "label",
      weight : -10,
      editors : [{
        type  : "boolean",
        options : {
          default : false
        }
      }, {
        type  : "template",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "tickmark",
      event : "options.chart.label.tickmark",
      group : "label",
      weight : -10,
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "labelhorizontal",
      group : "label",
      label : "horizontal",
      event : "options.chart.labelhorizontal",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    options.push({
      name  : "displayrulemajor",
      label : "major",
      group : "rules",
      event : "options.chart.cartesian.displayrulemajor",
      editors : [{
        type  : "boolean",
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
      name  : "displayruleminor",
      label : "minor",
      group : "rules",
      event : "options.chart.cartesian.displayruleminor",
      editors : [{
        type  : "boolean",
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
      name  : "displaytickmajor",
      label : "major",
      group : "tickmarks",
      event : "options.chart.cartesian.displaytickmajor",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "expression",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "displaytickminor",
      label : "minor",
      group : "tickmarks",
      event : "options.chart.cartesian.displaytickminor",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "expression",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "displayticklabel",
      label : "display label",
      group : "axis",
      event : "options.chart.cartesian.displayticklabel",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "expression",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "displayanchorlinetick",
      label : "border",
      group : "tickmarks",
      event : "options.chart.cartesian.displayanchorlinetick",
      editors : [{
        type  : "boolean",
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
/*
    options.push({
      name  : "displayanchorlinerule",
      label : "display anchor line rule",
      group : "tickmarks",
      event : "options.chart.cartesian.displayanchorlinerule",
      editors : [{
        type  : "boolean",
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
*/
    options.push({
      name  : "lengthtickminor",
      label : "length minor",
      group : "tickmarks",
      event : "options.chart.cartesian.lengthtickminor",
      editors : [{
        type  : "float",
        options : {
          default : 2,
          step : 1
        }
      }]
    });

    options.push({
      name  : "lengthtickmajor",
      label : "length major",
      group : "tickmarks",
      event : "options.chart.cartesian.lengthtickmajor",
      editors : [{
        type  : "float",
        options : {
          default : 5,
          step : 1
        }
      }]
    });

    options.push({
      name  : "paddingtickminor",
      label : "margin minor",
      group : "tickmarks",
      event : "options.chart.cartesian.paddingtickminor",
      editors : [{
        type  : "float",
        options : {
          default : 1,
          step : 1
        }
      }]
    });

    options.push({
      name  : "paddingtickmajor",
      label : "margin major",
      group : "tickmarks",
      event : "options.chart.cartesian.paddingtickmajor",
      editors : [{
        type  : "float",
        options : {
          default : 1,
          step : 1
        }
      }]
    });

    options.push({
      name  : "paddingticklabel",
      label : "margin label",
      group : "axis",
      event : "options.chart.cartesian.paddingticklabel",
      editors : [{
        type  : "float",
        options : {
          default : 10,
          step : 1
        }
      }]
    });


    options.push({
      name  : "paddingleft",
      label : "left",
      group : "padding",
      weight : 5,
      event : "options.chart.padding.left",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "px",
          default : preferences.height || 0
        }
      }]
    });

    options.push({
      name  : "paddingright",
      label : "right",
      group : "padding",
      weight : 6,
      event : "options.chart.padding.right",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "px",
          default : preferences.height || 0
        }
      }]
    });

    options.push({
      name  : "paddingtop",
      label : "top",
      group : "padding",
      weight : 7,
      event : "options.chart.padding.top",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "px",
          default : preferences.height || 0
        }
      }]
    });

    options.push({
      name  : "paddingbottom",
      label : "bottom",
      group : "padding",
      weight : 8,
      event : "options.chart.padding.bottom",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "px",
          default : preferences.height || 0
        }
      }]
    });

    // displayruleminor false
    // displayrulemajor false
    // displaytickminor true
    // displaytickmajor true
    // displayticklabel true
    // displayanchorlinetick false
    // displayanchorlinerule false
    // lengthtickminor 2
    // lengthtickmajor 5
    // paddingtickminor 1
    // paddingtickmajor 1
    // paddingticklabel 10


    /*
     labelOrientation = function(_) return null;
     labelAnchor = function(_) return null;
     labelAngle = function(_) return null;
     */
  }
});