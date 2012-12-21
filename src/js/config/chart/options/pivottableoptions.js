define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name  : "displaytotalcolumns",
      label : "columns",
      group : "displaytotals",
      event : "options.chart.pivottable.displaytotalcolumns",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    options.push({
      name  : "displaytotalrows",
      label : "rows",
      group : "displaytotals",
      event : "options.chart.pivottable.displaytotalrows",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    options.push({
      name  : "displayheatmap",
      label : "display colors",
      group : "aesthetic",
      event : "options.chart.pivottable.displayheatmap",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    var condition = {
          event   : "options.chart.pivottable.displayheatmap",
          visible : function(value) {
            return !!value;
          }
      };

    options.push({
      name : "startcolor",
      label : "start color",
      group : "aesthetic",
      event : "options.chart.pivottable.startcolor",
      weight : 10,
      condition : condition,
      editors : [{
        type : "color",
        options : {
          default : "#ffffff"
        }
      }]
    });

    options.push({
      name : "endcolor",
      label : "end color",
      group : "aesthetic",
      event : "options.chart.pivottable.endcolor",
      weight : 11,
      condition : condition,
      editors : [{
        type : "color",
        options : {
          default : "#007fff"
        }
      }]
    });

    options.push({
      name  : "cellclass",
      label : "cell",
      group : "customclasses",
      event : "options.chart.pivottable.cellclass",
      editors : [{
        type  : "expression",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });

    options.push({
      name  : "valueclass",
      label : "value",
      group : "customclasses",
      event : "options.chart.pivottable.valueclass",
      editors : [{
        type  : "expression",
        options : {
          default : "",
          variables : ["value", "header"],
          useDimensions : false
        }
      }]
    });

    options.push({
      name  : "headerclass",
      label : "header",
      group : "customclasses",
      event : "options.chart.pivottable.headerclass",
      editors : [{
        type  : "expression",
        options : {
          default : "",
          variables : ["header"],
          useDimensions : false
        }
      }]
    });

    options.push({
      name  : "totalclass",
      label : "total",
      group : "customclasses",
      event : "options.chart.pivottable.totalclass",
      editors : [{
        type  : "expression",
        options : {
          default : "",
          variables : ["value", "values"],
          useDimensions : false
        }
      }]
    });

    options.push({
      name  : "axisvalue",
      label : "axis",
      event : "options.chart.label.axisvalue",
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
          variables : ["value", "axis"]
        }
      }]
    });

    options.push({
      name  : "total",
      label : "total",
      event : "options.chart.label.total",
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
          variables : ["value", "stats"]
        }
      }]
    });

    options.push({
      name  : "totalover",
      label : "total tooltip",
      event : "options.chart.label.totalover",
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
          variables : ["value", "stats"]
        }
      }]
    });

    options.push({
      name  : "axis",
      label : "header",
      event : "options.chart.label.axis",
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
          variables : ["value", "axis"]
        }
      }]
    });
  };
});