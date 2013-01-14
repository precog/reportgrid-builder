define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      label  : "thin back-edges",
      group : "aesthetic",
      weight : 10,
      event : "options.chart.sankey.thinbackedges",
      editors : [{
        type  : "boolean",
        options : {
          default : false
        }
      }]
    });
    options.push({
      label  : "stack back-edges",
      group : "aesthetic",
      weight : 15,
      event : "options.chart.sankey.stackbackedges",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    options.push({
      label : "layer width",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.layerwidth",
      editors : [{
        type : "float",
        options : {
          default : 61,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "node spacing",
      group : "aesthetic",
      weight : 31,
      event : "options.chart.sankey.nodespacing",
      editors : [{
        type : "float",
        options : {
          default : 28,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "dummy spacing",
      group : "aesthetic",
      weight : 30,
      event : "options.chart.sankey.dummyspacing",
      editors : [{
        type : "float",
        options : {
          default : 18,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "back-edge spacing",
      group : "aesthetic",
      weight : 16,
      event : "options.chart.sankey.backedgespacing",
      editors : [{
        type : "float",
        options : {
          default : 4,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "extra height",
      group : "aesthetic",
      weight : 30,
      event : "options.chart.sankey.extraheight",
      editors : [{
        type : "float",
        options : {
          default : 5,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "extra radius",
      group : "aesthetic",
      weight : 30,
      event : "options.chart.sankey.extraradius",
      editors : [{
        type : "float",
        options : {
          default : 5,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "width",
      group : "thumbnails",
      weight : 5,
      event : "options.chart.sankey.imagewidth",
      condition : {
        event   : "options.chart.sankey.imagepath",
        visible : function(value) {
          return value && (""+value).length > 0;
        }
      },
      editors : [{
        type : "float",
        options : {
          default : 60,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "height",
      group : "thumbnails",
      weight : 6,
      event : "options.chart.sankey.imageheight",
      condition : {
        event   : "options.chart.sankey.imagepath",
          visible : function(value) {
          return value && (""+value).length > 0;
        }
      },
      editors : [{
        type : "float",
        options : {
          default : 48,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "spacing",
      group : "thumbnails",
      weight : 8,
      event : "options.chart.sankey.imagespacing",
      condition : {
        event   : "options.chart.sankey.imagepath",
        visible : function(value) {
          return value && (""+value).length > 0;
        }
      },
      editors : [{
        type : "float",
        options : {
          default : 0,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "label node spacing",
      group : "aesthetic",
      weight : 32,
      event : "options.chart.sankey.labelnodespacing",
      editors : [{
        type : "float",
        options : {
          default : 4,
          step : 1,
          min : 0
        }
      }]
    });
    options.push({
      label : "chunk width",
      group : "aesthetic",
      weight : 11,
      event : "options.chart.sankey.chunkwidth",
      condition : {
        event   : "options.chart.sankey.thinbackedges",
        visible : function(value) {
          return !!value;
        }
      },
      editors : [{
        type : "float",
        options : {
          default : 10,
          step : 1,
          min : 0
        }
      }]
    });

    options.push({
      label : "image url",
      group : "thumbnails",
      weight : 0,
      event : "options.chart.sankey.imagepath",
      editors : [{
        type : "expression",
        options : {
          default : "",
          variables : ["id"],
          useDimensions : true,
          placeholder : '="http://example.com/"+id+".jpg"'
        }
      }]
    });

    options.push({
      label : "node class",
      group : "customclasses",
      weight : 0,
      event : "options.chart.sankey.nodeclass",
      editors : [{
        type : "string",
        options : {
          default : "",
          placeholder : 'custom-class'
        }
      }, {
        type : "expression",
        options : {
          default : "",
          variables : ["id","stats"],
          useDimensions : false,
          placeholder : '="custom-class"'
        }
      }]
    });

    options.push({
      label : "edge class",
      group : "customclasses",
      weight : 0,
      event : "options.chart.sankey.edgeclass",
      editors : [{
        type : "string",
        options : {
          default : "",
          placeholder : 'custom-class'
        }
      }, {
        type : "expression",
        options : {
          default : "",
          variables : ["head", "tail","stats"],
          useDimensions : false,
          placeholder : '="custom-class"'
        }
      }]
    });

    options.push({
      label : "display entry",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.displayentry",
      editors : [{
        type : "boolean",
        options : {
          default : true
        }
      }, {
        type : "expression",
        options : {
          default : "",
          variables : ["head", "tail","stats"],
          useDimensions : false,
          placeholder : '=head=="entry"'
        }
      }]
    });

    options.push({
      label : "display exit",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.displayexit",
      editors : [{
        type : "boolean",
        options : {
          default : true
        }
      }, {
        type : "expression",
        options : {
          default : "",
          variables : ["head", "tail","stats"],
          useDimensions : false,
          placeholder : '=tail=="exit"'
        }
      }]
    });

    options.push({
      label : "layout method",
      group : "sankey",
      weight : -5,
      event : "options.chart.sankey.layoutmethod",
      editors : [{
        type : "selection",
        options : {
          default : "sugiyama",
          values : [{
            value : "sugiyama",
            label : "Sugiyama"
          }, {
            value : "weightbalance",
            label : "Weight Balance"
          }]
        }
      }]
    });

    options.push({
      label : "edge",
      event : "options.chart.label.edge",
      group : "label",
      weight : 8,
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });

    options.push({
      label : "edge tooltip",
      event : "options.chart.label.edgeover",
      group : "label",
      weight : 10,
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });

    options.push({
      label : "node",
      event : "options.chart.label.node",
      group : "label",
      weight : 5,
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });
  };
});