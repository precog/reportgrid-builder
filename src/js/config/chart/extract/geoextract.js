define([
  "config/chart/extract/ensure"
],

function(ensure) {
  function ensureMap(o, i) {
    var map = o.map || (o.map = []);
    return map[i] || (map[i] = {});
  }
  return function(o, dimensions, options) {
    for(var i = 0; i < 5; i++) {
      var template = options["geo.template"+i];
      if(template && template !== '-')
        ensureMap(o, i).template = template;

      var value = options["geo.scale"+i],
          projection = options["geo.projection"+i];

      if(projection && (
           (template == 'world' && projection !== 'mercator')
        || (['usa-states', 'usa-states-centroids', 'usa-counties'].indexOf(template) >= 0 && projection !== 'albersusa')
      )) {
        ensureMap(o, i).projection = projection;
      }

      if(value && (
           (projection  == "mercator" && value !== 500)
        || ((projection == "albers" || projection == "albersusa") && value !== 1000)
        || (projection  == "azimuthal" && value !== 200)
      )) {
        ensureMap(o, i).scale = value;
      }

      var mode = options["geo.mode"+i];
      if(mode) {
        ensureMap(o, i).mode = mode;
      }

      var color = options["geo.color"+i];
      if("css:1" !== color)
        ensureMap(o, i).color = color;

      if(dimensions.feature) {
        ensureMap(o, i).property = dimensions.feature[0].field.field;
      }
    }

    if(dimensions.feature) {
      ensureMap(o, 0).property = dimensions.feature[0].field.field;
    }

    if(o.map && o.map.length > 0) {
      for(var i = o.map.length-1; i >= 0; i--) {
        if(!o.map[i]) continue;
        if(!(o.map[i].template || o.map[i].url))
          o.map.splice(i, 1);
      }
    }

    if(o.map && o.map.length === 1)
      o.map = o.map[0];

    if(!o.map || o.map.length === 0)
      throw "at least a map declaration is required to render a geo chart";

  };
});