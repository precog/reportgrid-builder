define([
    "jquery"
  , "lib/util/grid"
  , "lib/model/dataloader"
],

function($, create_grid, create_loader) {
  return function(ctx) {
    var $el,
        grid;

    function create_columns(fields) {
      var columns = [];

      return fields.map(function(field) {
        return { id : name, name : field.name || field.field, field : field.field };
      });
    }

    function create_options() {
      return {
          enableCellNavigation: false
        , enableColumnReorder: true
        , forceFitColumns: true
      };
    }

    function create_loaded_handler(datasource) {
      return function(data) {
        var columns = create_columns(datasource.fields),
            options = create_options();
        grid = create_grid($el, data, columns, options);
      };
    }

    function dataError(error) {

    }

    ctx.on("data.datasource.preview.render", function(datasource) {
      var loader = create_loader(datasource);
      loader.on("success", create_loaded_handler(datasource));
      loader.on("error", dataError);
      loader.load();
    });

    ctx.on("data.datasource.preview.clear", function() {
      if(grid) {
        grid.destroy();
        grid = null;
      }
    });

    ctx.one("view.data.dataviewer", function(container) {
      $el = $('<div class="datasource-preview"></div>').appendTo(container);
    });
  }
});