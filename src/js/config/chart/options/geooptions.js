define([

],

function() {
  function injectPreviousCondition(o, event, index) {
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

  function injectCondition(o, event, index) {
    o.condition = {
      event : event + index,
      visible : function(value) {
        return value && value != "-";
      }
    };
    o.name  += index;
    o.group += index;
    o.event += index;
    return o;
  }

  return function(options, preferences) {
    preferences = preferences || {};

    for(var i = 0; i < 5; i++) {
      (function(i) {
        options.push(injectPreviousCondition({
          name    : "template",
          label   : "map",
          group   : "map",
          weight  : -5,
          event   : "options.chart.geo.template",
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
          name   : "projection",
          label  : "projection",
          group  : "map",
          weight : 5,
          event  : "options.chart.geo.projection",
          link   : function(ctx, editor) {
            this._handler = function(template) {
              if(template == "world") {
                editor.value.set("mercator");
              } else {
                editor.value.set("albersusa");
              }
            };
            setTimeout(function() {
              ctx.on("options.chart.geo.template"+i, this._handler);
            }, 500); // the delay is required to allow loading to set a different value
          },
          unlink : function(ctx, editor) {
            ctx.off("options.chart.geo.template"+i, this._handler);
            delete this._handler;
          },
          editors : [{
            type : "selection",
            options : {
              default : "mercator",
              values : [{
                value : "mercator",
                label : "Mercator"
              }, {
                value : "albers",
                label : "Albers"
              }, {
                value : "albersusa",
                label : "Albers USA"
              }, {
                value : "azimuthal",
                label : "azimuthal"
              }]
            }
          }]
        }, "options.chart.geo.template", i));

        options.push(injectCondition({
          name   : "scale",
          label  : "scale",
          group  : "map",
          weight : 6,
          event  : "options.chart.geo.scale",
          link   : function(ctx, editor) {
            this._handler = function(projection) {
              var scale = 1000;
              if(projection === "mercator") {
                scale = 500;
              } else if(projection === "azimuthal") {
                scale = 200;
              }
              var is_default = editor.value.isDefault();
              editor.value.setDefault(scale);
              if(is_default)
                editor.value.reset();
            };
            ctx.on("options.chart.geo.projection"+i, this._handler);
          },
          unlink : function(ctx, editor) {
            ctx.off("options.chart.geo.projection"+i, this._handler);
            delete this._handler;
          },
          editors : [{
            type : "float",
            options : {
              default: 0,
              min : 0,
              step : 50
            }
          }]
        }, "options.chart.geo.template", i));

        options.push({
          name   : "mode"+i,
          label  : "mode",
          group  : "map"+i,
          weight : 6,
          event  : "options.chart.geo.mode"+i,
          condition : {
            event : "options.chart.geo.projection"+i,
            visible : function(value) {
              return value && value === "azimuthal";
            }
          },
          editors : [{
            type : "selection",
            options : {
              default: "orthographic",
              values : [{
                value : "orthographic",
                label : "orthographic"
              }, {
                value : "stereographic",
                label : "stereographic"
              }]
            }
          }]
        });



        //mode orthographic/stereogrphic
        //color css/css:int/i:/s:/f:
        //projection mercator/albers/albersusa/azimuthal
        //radius float/function(dp,stats)

        //classname string container
        //label object
        //"labeloutline".toBool(["labelOutline"]),
        //"labelshadow".toBool(["labelShadow"])
        //mapping url/json object
        //origin double x/y value to map to an array
        //parallels (only for albers projection) array of float
        //property null/string
        //translate array float
        //url string

      })(i);
    }
  };
});