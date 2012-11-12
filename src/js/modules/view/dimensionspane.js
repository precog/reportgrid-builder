define([
    "jquery"
  , "config/ui"
  , "lib/util/ui"
],

function($, uiconfig, ui) {
  return function(ctx) {
    var el,
        $fields,
        $closer,
        datasource,
        axeslist,
        axesmap;

    function updateChartType(type) {
      $fields.children("*").remove();
      if(datasource)
        setTimeout(function() {
          updateDataSource(datasource);
        }, 200);
    }

    function updateDataSource(source) {
      datasource = source;
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
      axeslist = source.fields.list.map(function(field) {
        var axis = {
          type : field.type,
          name : field.name,
          $select : null
        };
        axesmap[field.name] = axis;
        return axis;
      });

      fillSelects();
    }

    function fillSelects() {
      $fields.find("select.secondary").remove();
      
      var $select = $fields.find("select");
      $select.find(".value").remove();
      $select.attr("disabled", false);
      fillSelect($select);
    }

    function fillSelect($select) {
      $(axeslist).each(function() {
        var $option = $('<option class="value '+this.type+'">'+this.name+'</option>');
        $select.append($option);
      });
    }

    function updateSingleSelect($container, dimension) {

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
          types.push(datasource.fields.map[$(this).val()]);
        });
      ctx.trigger("chart.axis.change", types, dimension);
    }

    function createSelectChange($container, $select, multiple, dimension) {
      var lastval;
      return function() {
        var val  = $select.val();
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
      $select.addClass(optionality);
      if(info.multiple)
        $select.addClass("multiple");
      $select.attr("disabled", true);

      $select.append('<option value="" class="'+optionality+'">['+optionality+']</option>');

      $select.on("change", createSelectChange($container, $select, info.multiple, info.dimension));
    }

    function createSelect($container, info) {
      var $select = $('<select></select>').appendTo($container);
      if(info.max === null || info.max > 1)
        $select.addClass("multi");
      if(info.secondary)
        $select.addClass("secondary");
      if(!info.enabled)
        $select.attr("disabled", true);
      if(info.min === 0) {
        $select.append('<option value="" class="optional">[optional]</option>');
      } else {
        $select.append('<option value="" class="mandatory">[select]</option>');
      }
      var lastval;
      $select.on("change", function() {
        var val = $(this).val();
        axesmap[val].$select = $select;
        if(val == "") {
          $select.find(".optional").text("[optional]");
        } else {
          $select.find(".optional").text("[remove]");
        }
        if($container.find("select").length < Math.min(info.max || 100, datasource.fields.list.length)) {
          var $clone = $select.clone();
          $container.append($clone);
        }
        $select.find(".mandatory").remove();
        lastval = val;
        triggerChangeAxis($container, dimension);
      });

      return $select;
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
      ctx.on("chart.datasource.change", updateDataSource);
      ctx.on("chart.dimension.add", appendDimension);
    }

    ctx.on("view.editor.dimensions", init);
  };
});