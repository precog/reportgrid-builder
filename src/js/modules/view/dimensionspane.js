define([
    "jquery"
  , "config/ui"
  , "config/charts"
  , "lib/util/ui"
],

function($, uiconfig, charts, ui) {
  return function(ctx) {
    var el,
        $fields,
        $closer,
        fields,
        fieldsmap,
        axeslist,
        axesmap,
        currentDimensions = {};

    function updateChartType(type) {
      $fields.children("div.pair").remove();
      var chart = charts.map[type];
      dimensionsInfo = {};
      for(var i = 0; i < chart.dimensions.length; i++) {
        appendDimension(chart.dimensions[i]);
      }
      if(fields)
        setTimeout(function() {
          updateFields(fields);
        }, 200);
    }

    function updateFields(fields) {
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
      axeslist = fields.map(function(field) {
        var axis = {
          type : field.type,
          name : field.field,
          $select : null
        };
        axesmap[field.field] = axis;
        return axis;
      });
      fillSelects();
    }

    function updateDataSource(source) {
      fieldsmap = {};
      if(source) {
        fields = source.fields;
        for(var i = 0; i < fields.length; i++) {
          fieldsmap[fields[i].field] = fields[i];
        }
      } else {
        fields = [];
      }
//      var defaultValues = currentDimensions[dimension.name] || [];
      updateFields(fields);
    }

    function fillSelects() {
      $fields.find("select.secondary").remove();
      
      var $select = $fields.find("select");
      $select.find(".value").remove();
      $select.attr("disabled", false);
      fillSelect($select);
    }

    function fillSelect($select) {
      $select.each(function(i) {
        var $current = $(this),
            name  = $current.attr("data-id"),
            pos   = $current.index(),
            value = (currentDimensions[name] || [])[pos];
        $(axeslist).each(function() {
          var $option = $('<option class="value '+this.type+'">'+this.name+'</option>');
          if(value === this.name) {
            $option.attr("selected", true);
            $current.attr("disabled", false);
          }
          $current.append($option);
        });

      });
    }

    function updateSingleSelect($container, dimension) {
      var $principal = $container.find("select.principal");
    }

    function updateMultipleSelect($container, dimension) {

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
        createSecondaryDimensionSelector($container, dimension);
      }
    }

    function dimensionInfo(dimension) {
      return {
        optional : dimension.min === 0,
        multiple : dimension.max === null || dimension.max > 1,
        dimension : dimension
      };
    }

    function createSecondaryDimensionSelector($container, dimension) {
      var $select = $('<select class="secondary"></select>').appendTo($container),
          optionality = "optional";
      $select.attr("data-id", dimension.name);
      $select.append('<option value="" class="'+optionality+'">['+optionality+']</option>');
      $select.on("change", createSelectChange($container, $select, true, dimension));

      fillSelect($select);
    }

    function triggerChangeAxis($container, dimension) {
      var types = [];
      $container
        .find("select")
        .filter(function() {
          return $(this).val() !== "";
        })
        .each(function() {
          types.push(fieldsmap[$(this).val()]);
        });
      ctx.off("chart.axis.change", axisChange);
      ctx.trigger("chart.axis.change", types, dimension);
      ctx.on("chart.axis.change", axisChange);
    }

    function createSelectChange($container, $select, multiple, dimension) {
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
            createSecondaryDimensionSelector($container, dimension);
        }
        lastval = val;
        if(multiple)
          updateMultipleSelect($container, dimension);
        else
          updateSingleSelect($container, dimension);
        triggerChangeAxis($container, dimension);
      };
    }

    function createMainDimensionSelector($container, info) {
      var $select = $('<select class="principal"></select>').appendTo($container),
          optionality = info.optional ? "optional" : "mandatory";
      $select.attr("data-id", info.dimension.name);
      $select.addClass(optionality);
      if(info.multiple)
        $select.addClass("multiple");
      $select.attr("disabled", true);

      $select.append('<option value="" class="'+optionality+'">['+optionality+']</option>');

      $select.on("change", createSelectChange($container, $select, info.multiple, info.dimension));
    }

    function appendDimension(dimension) {
      var $pair = $('<div class="pair ui-widget-header ui-corner-all"></div>');
      $pair.insertBefore($closer);
      var $label = $('<div class="name">'+(dimension.label || dimension.name)+'</div>');
      $pair.append($label);
      var $div = $('<div class="dimension"></div>').appendTo($pair);
      createMainDimensionSelector($div, dimensionInfo(dimension));
    }

    function init(container) {
      el = container;

      $fields = $('<div class="fields"></div>').appendTo(el);
      $closer = $('<div class="clr"></div>').appendTo($fields);

      ctx.on("chart.type.change", updateChartType);
//      ctx.on("chart.dimension.add", appendDimension);
      ctx.on("chart.datasource.change", updateDataSource);
    }

    function axisChange(types, dimension) {
      var t = types.slice(0),
        info = dimensionInfo(dimension);
      function dequeue(rep) {
        if(t.length === 0) return;
        var field = t.shift().field;
        if(axesmap[field]) {
          var select = el.find('select[data-id="'+dimension.name+'"]'),
            $sel = $(select.get(rep));
          $sel.val(field);
          if(info.multiple) // && $sel.parent().find("select.secondary").length + 1 < axeslist.length)
            createSecondaryDimensionSelector($sel.parent(), dimension);
        }
        rep++;
        setTimeout(function() { dequeue(rep + 1); }, 20);
      }

      setTimeout(function() { dequeue(0); }, 20);
      currentDimensions[dimension.name] = types.map(function(v) { return v.field; });
    }

    ctx.on("chart.axis.change", axisChange);

    ctx.on("view.editor.dimensions", init);
  };
});