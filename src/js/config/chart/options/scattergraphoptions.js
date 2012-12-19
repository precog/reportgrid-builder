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

    var sizeeditor = { type : "expression", options : { default : "=64", unit : "px²", className : "small" }};
    options.push({
      name : "symbol",
      label : "shape",
      group : "symbol",
      event : "options.chart.scattergraph.symbol",
      editors : [{
        type : "selection",
        options : {
          values : [
              { value : "circle:",        label : "circle",          editor : sizeeditor }
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
          default : "=symbol('circle',64)"
        }
      }]
    });

    options.push({
      name : "symbolstyle",
      label : "style",
      group : "symbol",
      event : "options.chart.scattergraph.symbolstyle",
      editors : [{
        type : "template",
        default : "",
        variables : ["stats"],
        useDimensions : true
      }]
    });
  };
});