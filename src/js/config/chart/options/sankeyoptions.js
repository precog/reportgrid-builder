define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    //BOOL
    //thinbackedges   false
    //stackbackedges  true
    options.push({
      name  : "thinbackedges",
      label  : "thin back-edges",
      group : "sankey",
      event : "options.chart.sankey.thinbackedges",
      editors : [{
        type  : "boolean",
        options : {
          default : false
        }
      }]
    });
    options.push({
      name  : "stackbackedges",
      label  : "stack back-edges",
      group : "sankey",
      event : "options.chart.sankey.stackbackedges",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    //FLOAT
    //layerwidth       61
    //nodespacing      28
    //dummyspacing     18
    //backedgespacing   4
    //extraheight       5
    //extraradius       5
    //imagewidth       60
    //imageheight      48
    //imagespacing      0
    //labelnodespacing  4
    //chunkwidth  4
    options.push({
      name : "layerwidth",
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
      name : "nodespacing",
      label : "node spacing",
      group : "sankey",
      weight : 0,
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
      name : "dummyspacing",
      label : "dummy spacing",
      group : "sankey",
      weight : 0,
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
      name : "backedgespacing",
      label : "back-edge spacing",
      group : "sankey",
      weight : 0,
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
      name : "extraheight",
      label : "extra height",
      group : "sankey",
      weight : 0,
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
      name : "extraradius",
      label : "extra radius",
      group : "sankey",
      weight : 0,
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
      name : "imagewidth",
      label : "image width",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.imagewidth",
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
      name : "imageheight",
      label : "image height",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.imageheight",
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
      name : "imagespacing",
      label : "image spacing",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.imagespacing",
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
      name : "labelnodespacing",
      label : "label node spacing",
      group : "sankey",
      weight : 0,
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
      name : "chunkwidth",
      label : "chunk width",
      group : "sankey",
      weight : 0,
      event : "options.chart.sankey.chunkwidth",
      editors : [{
        type : "float",
        options : {
          default : 10,
          step : 1,
          min : 0
        }
      }]
    });

    //EXPRESSION
    //imagepath
    options.push({
      name : "imagepath",
      label : "image path",
      group : "sankey",
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

    //EXPRESSION OR STRING
    //nodeclass
    options.push({
      name : "nodeclass",
      label : "node class",
      group : "sankey",
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
    //edgeclass
    options.push({
      name : "edgeclass",
      label : "edge class",
      group : "sankey",
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
    //displayentry
    options.push({
      name : "displayentry",
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
    //displayexit
    options.push({
      name : "displayexit",
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

    //SELECT
    //layoutmethod   sugiyama  weightbalance
    options.push({
      name : "layoutmethod",
      label : "layout method",
      group : "sankey",
      weight : 0,
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

    //LAYOUT MAP
    //layoutmap

    //LABEL
    //edge
    options.push({
      name  : "edge",
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

    //edgeover
    options.push({
      name  : "edgeover",
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

    //node
    options.push({
      name  : "node",
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