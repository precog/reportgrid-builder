define([
  "lib/util/view/editors/editor"
],

function(createEditor) {
  return function(el, options, ctx) {
    options = $.extend({default : "" }, options);

    var $input = $('<input type="text" class="template">');
    if(options.className)
      $input.addClass(options.className);
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v.trim(); }
    };

    function variables_from_dimensions(fields) {
      return fields.map(function(field) {
        return field.field;
      });
    }

    function extract_variables(fields) {
      fields = fields || [];
      return (options.useDimensions
        ? variables_from_dimensions(fields)
        : []).concat(options.variables || []);
    }

    function guess_placeholder(fields) {
      if(options.useDimensions && fields && fields.length > 0) {
        var variables = variables_from_dimensions(fields);
        return "@"+variables[0] + (variables.length > 1 ? ": @"+variables.slice(1).join(", @") : "");
      } else if(options.variables && options.variables.length > 0) {
        return "@" + options.variables[0];
      } else {
        return "";
      }
    }

    function chart_datasource_change(datasource) {
      var variables = extract_variables(datasource && datasource.fields),
          title = (variables.length === 0)
            ? "no variables are available"
            : "variables: @" + variables.join(", @");

      $input.attr("title", title);
      if(variables.length > 0 && "undefined" === typeof options.placeholder) {
        $input.attr("placeholder", guess_placeholder(datasource && datasource.fields));
      }
    }

    ctx.on("chart.datasource.change", chart_datasource_change);

    return createEditor(el, options, params);
  };
});