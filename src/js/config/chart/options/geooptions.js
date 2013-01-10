define([

],

function() {
  function injectCondition(o, event, index) {
    if(index > 0) {
      o.condition = {
        event : event + (index-1),
        visible : function(value) {
          return value && value != "-";
        }
      };
    }
    o.name  += index;
    o.group += index;
    o.event += index;
    return o;
  }

  return function(options, preferences) {
    preferences = preferences || {};

    for(var i = 0; i < 5; i++) {
      (function(i) {
        options.push(injectCondition({
          name : "template",
          label : "map",
          group : "map",
          weight : -5,
          event : "options.chart.geo.template",
          editors : [{
            type : "selection",
            options : {
              default : i == 0 ? "world" : "",
              values : [{
                value : "-",
                label : "[select a template]"
              }, {
                value : "world",
                label : "world"
              }, {
                value : "usa-states",
                label : "USA states"
              }, {
                value : "usa-state-centroids",
                label : "USA state centroids"
              }, {
                value : "usa-counties",
                label : "USA counties"
              }]
            }
          }]
        }, "options.chart.geo.template", i));

        options.push(injectCondition({
          name : "scale",
          label : "scale",
          group : "map",
          weight : -5,
          event : "options.chart.geo.scale",
          link : function(ctx, editor) {
            this._scale_handler = function(template) {
              var scale = 500;
              if(template === "usa-states")
              {
                scale = 1000;
              }
              var is_default = editor.value.isDefault();
console.log(is_default);
              editor.value.setDefault(scale);
              if(is_default)
                editor.value.reset();
            };
            ctx.on("options.chart.geo.template"+i, this._scale_handler);
          },
          unlink : function(ctx, editor) {
            ctx.off("options.chart.geo.template"+i, this._scale_handler);
          },
          editors : [{
            type : "float",
            options : {
              default: 1.0,
              min : 0.1,
              step : 0.1
            }
          }]
        }, "options.chart.geo.template", i));
      })(i);

      //mercator 500
      //albers 1000
      //azimuthal 200

      //			"labeloutline".toBool(["labelOutline"]),
      //"labelshadow".toBool(["labelShadow"])
      //scale float
      //color css/css:int/i:/s:/f:
      //mode orthographic/stereogrphic
      //projection mercator/albers/albersusa/azimuthal
      //radius float/function(dp,stats)

      //classname string container
      //label object
      //mapping url/json object
      //origin double x/y value to map to an array
      //parallels (only for albers projection) array of float
      //property null/string
      //translate array float
      //url string
    }

/*
    //BOOL
    //thinbackedges   false
    //stackbackedges  true
    options.push({
      name  : "thinbackedges",
      label  : "thin back-edges",
      group : "aesthetic",
      weight : 10,
      event : "options.chart.geo.thinbackedges",
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
      group : "aesthetic",
      weight : 15,
      event : "options.chart.geo.stackbackedges",
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
      group : "geo",
      weight : 0,
      event : "options.chart.geo.layerwidth",
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
      group : "aesthetic",
      weight : 31,
      event : "options.chart.geo.nodespacing",
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
      group : "aesthetic",
      weight : 30,
      event : "options.chart.geo.dummyspacing",
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
      group : "aesthetic",
      weight : 16,
      event : "options.chart.geo.backedgespacing",
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
      group : "aesthetic",
      weight : 30,
      event : "options.chart.geo.extraheight",
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
      group : "aesthetic",
      weight : 30,
      event : "options.chart.geo.extraradius",
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
      label : "width",
      group : "thumbnails",
      weight : 5,
      event : "options.chart.geo.imagewidth",
      condition : {
        event   : "options.chart.geo.imagepath",
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
      name : "imageheight",
      label : "height",
      group : "thumbnails",
      weight : 6,
      event : "options.chart.geo.imageheight",
      condition : {
        event   : "options.chart.geo.imagepath",
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
      name : "imagespacing",
      label : "spacing",
      group : "thumbnails",
      weight : 8,
      event : "options.chart.geo.imagespacing",
      condition : {
        event   : "options.chart.geo.imagepath",
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
      name : "labelnodespacing",
      label : "label node spacing",
      group : "aesthetic",
      weight : 32,
      event : "options.chart.geo.labelnodespacing",
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
      group : "aesthetic",
      weight : 11,
      event : "options.chart.geo.chunkwidth",
      condition : {
        event   : "options.chart.geo.thinbackedges",
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

    //EXPRESSION
    //imagepath
    options.push({
      name : "imagepath",
      label : "image url",
      group : "thumbnails",
      weight : 0,
      event : "options.chart.geo.imagepath",
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
      group : "customclasses",
      weight : 0,
      event : "options.chart.geo.nodeclass",
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
      group : "customclasses",
      weight : 0,
      event : "options.chart.geo.edgeclass",
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
      group : "geo",
      weight : 0,
      event : "options.chart.geo.displayentry",
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
      group : "geo",
      weight : 0,
      event : "options.chart.geo.displayexit",
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
*/
  };
});