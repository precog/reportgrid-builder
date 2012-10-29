define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "title",
      event : "options.chart.label.title",
      group : "general",
      weight : -10,
      editors : [{
        type  : "template",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "tooltip",
      event : "options.chart.label.datapointover",
      group : "label",
      weight : -10,
      editors : [{
        type  : "bool",
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
      name  : "titleontop",
      label : "title on top",
      event : "options.chart.titleontop",
      group : "label",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }],
      condition : {
        event   : "options.chart.title",
        visible : function(value) {
          return value !== '';
        }
      }
    });

    options.push({
      name  : "width",
      group : "general",
      weight : 10,
      event : "options.chart.width",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          step    : 25,
          unit    : "px",
          default : preferences.width || 500
        }
      }]
    });

    options.push({
      name  : "height",
      group : "general",
      weight : 11,
      event : "options.chart.height",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          step    : 25,
          unit    : "px",
          default : preferences.height || 250
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
  };
});