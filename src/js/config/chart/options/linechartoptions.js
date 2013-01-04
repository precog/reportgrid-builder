define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name : "datapoint",
      group : "label",
      event : "options.chart.label.datapoint",
      editors : [{
        type  : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });

    var sizeeditor = { type : "expression", options : { default : "=64", unit : "px²", className : "small", variables : ["stats"], useDimensions : true }};
    options.push({
      name : "symbol",
      label : "shape",
      group : "symbol",
      event : "options.chart.linechart.symbol",
      editors : [{
        type : "selection",
        options : {
          default : "",
          values : [
              { value : "",               label : "[no symbol]" }
            , { value : "circle:",        label : "circle",          editor : sizeeditor }
            , { value : "square:",        label : "square",          editor : sizeeditor }
            , { value : "diamond:",       label : "diamond",         editor : sizeeditor }
            , { value : "cross:",         label : "cross",           editor : sizeeditor }
            , { value : "star:",          label : "star",            editor : sizeeditor }
            , { value : "triangleDown:",  label : "triangle down",   editor : sizeeditor }
            , { value : "triangleUp:",    label : "triangle up",     editor : sizeeditor }
            , { value : "arrowUp:",       label : "arrow up",        editor : sizeeditor }
            , { value : "arrowDown:",     label : "arrow down",      editor : sizeeditor }
            , { value : "arrowRight:",    label : "arrow right",     editor : sizeeditor }
            , { value : "arrowLeft:",     label : "arrow left",      editor : sizeeditor }
            , { value : "arrowDownWide:", label : "arrow down wide", editor : sizeeditor }
          ]
        }
      }, {
        type  : "expression",
        options : {
          default : "=symbol('circle',64)",
          variables : ["stats"],
          useDimensions : true,
          placeholder : "=compare(a.value,b.value)"
        }
      }]
    });

    options.push({
      name : "symbolstyle",
      label : "style",
      group : "symbol",
      event : "options.chart.linechart.symbolstyle",
      condition : {
        event   : "options.chart.linechart.symbol",
        visible : function(value) {
          return value !== "[no symbol]" && value !== "";
        }
      },
      editors : [{
        type : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true,
          placeholder : ""
        }
      }]
    });

    options.push({
      name : "displayarea",
      label : "area chart",
      group : "linechart",
      event : "options.chart.linechart.displayarea",
      editors : [{
        type : "boolean",
        options :  {
          default : false
        }
      }]
    });

    options.push({
      name : "y0property",
      label : "field for y0",
      group : "linechart",
      event : "options.chart.linechart.y0property",
      editors : [{
        type : "variable",
        options : {
          default : ""
        }
      }],
      condition : {
        event   : "options.chart.linechart.displayarea",
        visible : function(value) {
          return !!value;
        }
      }
    });

    options.push({
      name  : "sensibleradius",
      label : "sensible radius",
      group : "linechart",
      weight : 10,
      event : "options.chart.linechart.sensibleradius",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          step    : 10,
          unit    : "px",
          default : 100
        }
      }]
    });

    options.push({
      name : "lineeffect",
      label : "effect",
      group : "aesthetic",
      event : "options.chart.linechart.lineeffect",
      weight : 10,
      editors : [{
        type : "selection",
        options : {
          default : "gradient:",
          values : [
              { value : "noeffect",    label : "none" }
            , { value : "dropshadow:", label : "shadow",   editor : { type : "string", options : { default : "0.5,0.5,2" } } }
            , { value : "gradient:",   label : "gradient", editor : { type : "string", options : { default : "-1.2,2" } } }
          ]
        }
      }]
    });

    options.push({
      name : "lineinterpolation",
      label : "interpolation",
      group : "linechart",
      event : "options.chart.linechart.lineinterpolation",
      weight : 0,
      editors : [{
        type : "selection",
        options : {
          default : "linear",
          values : [
            { value : "linear" },
            { value : "basis" },
            { value : "cardinal:", label : "cardinal", editor : { type : "float", options : { default : 0.75, step : 0.05  } } },
            { value : "monotone" },
            { value : "step" },
            { value : "stepafter", label : "step after" },
            { value : "stepbefore", label : "step before" }
          ]
        }
      }]
    });
  };
});