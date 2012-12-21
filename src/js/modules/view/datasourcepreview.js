define([
    "jquery"
  , "lib/util/grid"
  , "lib/model/dataloader"
],

function($, createGrid, createLoader) {
  return function(ctx) {
    var $el,
        grid;

    function createColumns(fields) {
      var columns = [];

      return fields.map(function(field) {
        return { id : name, name : field.name || field.field, field : field.field };
      });
    }

    function createOptions() {
      return {
          enableCellNavigation: false
        , enableColumnReorder: true
        , forceFitColumns: true
      };
    }

    function createLoadedHandler(datasource) {
      return function(data) {
        var columns = createColumns(datasource.fields),
            options = createOptions();
        grid = createGrid($el, data, columns, options);
      };
    }

    function dataError(error) {

    }

    ctx.on("data.datasource.preview.render", function(datasource) {
      var loader = createLoader(datasource);
      loader.on("success", createLoadedHandler(datasource));
      loader.on("error", dataError);
      loader.load();
    });

    ctx.on("data.datasource.preview.clear", function() {
      if(grid) {
        grid.destroy();
        grid = null;
      }
    });

    ctx.on("data.datasource.selected", function(datasource) {
      ctx.trigger("data.datasource.preview.render", datasource);
    });

    ctx.on("data.datasource.deselected", function(datasource) {
      ctx.trigger("data.datasource.preview.clear");
    });

    ctx.one("view.data.dataviewer", function(container) {
      $el = $('<div class="datasource-preview"></div>').appendTo(container);
    });
  }
});