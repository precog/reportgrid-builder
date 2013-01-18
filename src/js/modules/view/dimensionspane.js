define([
    "jquery"
  , "config/ui"
  , "config/charts"
  , "lib/util/ui"
],

function($, uiconfig, charts, ui) {
  return function(ctx) {
    var el,
        $dimensions,
        $closer,
        variables,
        variables_map,
        axeslist,
        axesmap,
        dimensionsmap = {},
        current_variables = {};

    function chart_type_change(type) {
      $dimensions.children("div.pair").remove();
      current_variables = {};
      var chart = charts.map[type];
      for(var i = 0; i < chart.dimensions.length; i++) {
        append_dimension(chart.dimensions[i]);
      }
      if(variables)
        setTimeout(function() {
          update_variables(variables);
        }, 200);
    }

    function update_variables(vars) {
      if(axeslist) {
        $(axeslist).each(function() {
          var name = this.name;
          if(axesmap[name].$select) {
            axesmap[name].$select.val("");
            axesmap[name].$select.change();
          }
        });
      }
      axesmap = {};
      axeslist = vars.map(function(field) {
        var axis = {
          type : field.type,
          name : field.field,
          $select : null
        };
        axesmap[field.field] = axis;
        return axis;
      });
      fill_selects();
    }

    function update_data_source(source) {
      variables_map = {};
      current_variables = {};
      if(source) {
        variables = source.fields;
        for(var i = 0; i < variables.length; i++) {
          variables_map[variables[i].field] = variables[i];
        }
      } else {
        variables = [];
      }
      update_variables(variables);
    }

    function fill_selects() {
      $dimensions.find("select.secondary").remove();
      
      var $select = $dimensions.find("select");
      $select.find(".value").remove();
      fill_select($select);
    }

    function fill_select($select) {
      $select.each(function(i) {
        var $current = $(this),
            name  = $current.attr("data-id"),
            pos   = $current.index(),
            value = (current_variables[name] || [])[pos],
            dimension = dimensionsmap[name];
        $(axeslist).each(function() {
          if(dimension.accept && dimension.accept.indexOf(this.type) < 0)
            return;
          var $option = $('<option class="value '+this.type+'">'+this.name+'</option>');
          if(value === this.name) {
            $option.attr("selected", true);
          }
          $current.append($option);
        });
        if($current.find("option").length > 1)
          $current.attr("disabled", false);
        else
          $current.attr("disabled", true);

      });
    }

    function update_single_select($container, dimension) {
      var $principal = $container.find("select.principal");
    }

    function update_multiple_select($container, dimension) {

      var $selects   = $container.find('select.secondary'),
          $nonempty  = $selects.filter(function() { return $(this).val() !== ''; }),
          $empty     = $selects.filter(function() { return $(this).val() === ''; }),
          $principal = $container.find("select.principal");

      if($principal.val() === "" && $nonempty.length > 0) {
        var $secondary = $($nonempty.get(0)),
            val = $secondary.val();
        $secondary.val("");
        $principal.val(val);
        return;
      }

      $empty.remove();
      if($nonempty.length + 1 < axeslist.length) {
        create_secondary_dimension_selector($container, dimension);
      }
    }

    function dimension_info(dimension) {
      return {
        optional  : dimension.min === 0,
        multiple  : dimension.max === null || dimension.max > 1,
        dimension : dimension
      };
    }

    function create_secondary_dimension_selector($container, dimension) {
      var $select = $('<select class="secondary"></select>').appendTo($container),
          optionality = "optional";
      $select.attr("data-id", dimension.name);
      $select.append('<option value="" class="'+optionality+'">['+optionality+']</option>');
      $select.on("change", create_select_change($container, $select, true, dimension));

      fill_select($select);
    }

    function trigger_change_axis($container, dimension) {
      var types = [];
      $container
        .find("select")
        .filter(function() {
          return $(this).val() !== "";
        })
        .each(function() {
          types.push(variables_map[$(this).val()]);
        });
      ctx.off("chart.axis.change", chart_axis_change);
      ctx.trigger("chart.axis.change", types, dimension);
      ctx.on("chart.axis.change", chart_axis_change);
    }

    function create_select_change($container, $select, multiple, dimension) {
      var lastval;
      return function() {
        var val = $select.val();
        if(lastval && $container.find("select").filter(function() {
          return $select.get(0) !== this && $(this).val() === lastval;
        }).length === 0) {
          axesmap[lastval].$select = null;
        }
        if(val) {
          if(axesmap[val].$select) {
            axesmap[val].$select.val(lastval || "");
            axesmap[val].$select.change();
          }
          axesmap[val].$select = $select;
          if(multiple && $container.find("select.secondary").length + 1 < axeslist.length)
            create_secondary_dimension_selector($container, dimension);
        }
        lastval = val;
        if(multiple)
          update_multiple_select($container, dimension);
        else
          update_single_select($container, dimension);
        trigger_change_axis($container, dimension);
        ctx.trigger("user.chart.dimension", dimension);
      };
    }

    function create_main_dimension_selector($container, info) {
      var $select = $('<select class="principal"></select>').appendTo($container),
          optionality = info.optional ? "optional" : "mandatory";
      $select.attr("data-id", info.dimension.name);
      $select.addClass(optionality);
      if(info.multiple)
        $select.addClass("multiple");
      $select.attr("disabled", true);

      $select.append('<option value="" class="'+optionality+'">['+optionality+']</option>');

      $select.on("change", create_select_change($container, $select, info.multiple, info.dimension));
    }

    function append_dimension(dimension) {
      var $pair = $('<div class="pair ui-widget-header ui-corner-all"></div>');
      $pair.insertBefore($closer);
      var $label = $('<div class="name">'+(dimension.label || dimension.name)+'</div>');
      $pair.append($label);
      var $div = $('<div class="dimension"></div>').appendTo($pair);
      dimensionsmap[dimension.name] = dimension;
      create_main_dimension_selector($div, dimension_info(dimension));
    }

    function init(container) {
      el = container;

      $dimensions = $('<div class="variables"></div>').appendTo(el);
      $closer = $('<div class="clr"></div>').appendTo($dimensions);

      ctx.on("chart.type.change", chart_type_change);
      ctx.on("chart.datasource.change", update_data_source);
    }

    function chart_axis_change(types, dimension) {
      var t = types.slice(0),
          info = dimension_info(dimension);
      function dequeue(rep) {
        if(t.length === 0) return;
        var field = t.shift().field;
        if(axesmap[field]) {
          var select = el.find('select[data-id="'+dimension.name+'"]'),
            $sel = $(select.get(rep));
          $sel.val(field);
          if(info.multiple)
            create_secondary_dimension_selector($sel.parent(), dimension);
        }
        rep++;
        setTimeout(function() { dequeue(rep + 1); }, 20);
      }

      setTimeout(function() { dequeue(0); }, 20);
      current_variables[dimension.name] = types.map(function(v) { return v.field; });
    }

    ctx.on("chart.axis.change", chart_axis_change);

    ctx.one("view.editor.dimensions", init);
  };
});