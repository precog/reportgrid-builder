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
          default : "",
          variables : ["type"]
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
          default : "",
          variables : ["value","type"]
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
          default : "",
          variables : ["type"],
          placeholder : '=type=="axisvariable"',
          useDimensions : false
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
          default : "",
          variables : ["type"],
          placeholder : '=type=="axisvariable"',
          useDimensions : false
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
          default : "",
          variables : ["type"],
          placeholder : '=type=="axisvariable"',
          useDimensions : false
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
          default : "",
          variables : ["type"],
          placeholder : '=type=="axisvariable"',
          useDimensions : false
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
          default : "",
          variables : ["type"],
          placeholder : '=type=="axisvariable"',
          useDimensions : false
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
          default : "",
          variables : ["type"],
          placeholder : '=type=="axisvariable"',
          useDimensions : false
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
          default : "",
          variables : ["type"],
          useDimensions : false
        }
      }]
    });
*/
    options.push({
      name  : "lengthtickminor",
      label : "minor tickmarks",
      className : "inline first",
      group : "tickmarks",
      event : "options.chart.cartesian.lengthtickminor",
      weight : 100,
      editors : [{
        type  : "float",
        options : {
          unit : "length",
          default : 2,
          step : 1
        }
      }]
    });

    options.push({
      name  : "paddingtickminor",
      label : "",
      className : "inline last",
      group : "tickmarks",
      event : "options.chart.cartesian.paddingtickminor",
      weight : 101,
      editors : [{
        type  : "float",
        options : {
          unit : "margin",
          default : 1,
          step : 1
        }
      }]
    });


    options.push({
      name  : "lengthtickmajor",
      label : "major tickmarks",
      group : "tickmarks",
      className : "inline first",
      event : "options.chart.cartesian.lengthtickmajor",
      weight : 110,
      editors : [{
        type  : "float",
        options : {
          unit : "length",
          default : 5,
          step : 1
        }
      }]
    });

    options.push({
      name  : "paddingtickmajor",
      label : "",
      group : "tickmarks",
      className : "inline last",
      event : "options.chart.cartesian.paddingtickmajor",
      weight : 111,
      editors : [{
        type  : "float",
        options : {
          unit : "margin",
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
      label : "padding",
      group : "aesthetic",
      className : "inline first reduce",
      weight : 5,
      event : "options.chart.padding.left",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "L",
          title   : "left",
          allowEmpty : true,
          default : ""
        }
      }]
    });

    options.push({
      name  : "paddingright",
      label : "",
      group : "aesthetic",
      className : "inline reduce",
      weight : 6,
      event : "options.chart.padding.right",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "R",
          title   : "right",
          allowEmpty : true,
          default : ""
        }
      }]
    });

    options.push({
      name  : "paddingtop",
      label : "",
      group : "aesthetic",
      className : "inline reduce",
      weight : 7,
      event : "options.chart.padding.top",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "T",
          title   : "top",
          allowEmpty : true,
          default : ""
        }
      }]
    });

    options.push({
      name  : "paddingbottom",
      label : "",
      group : "aesthetic",
      className : "inline last reduce",
      weight : 8,
      event : "options.chart.padding.bottom",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 500,
          step    : 10,
          unit    : "B",
          title   : "bottom",
          allowEmpty : true,
          default : ""
        }
      }]
    });

    // displayticklabel true
    // displayanchorlinetick false
    // displayanchorlinerule false
    // paddingticklabel 10


    /*
     labelOrientation = function(_) return null;
     labelAnchor = function(_) return null;
     labelAngle = function(_) return null;
     */
  }
});