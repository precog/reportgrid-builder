define([

], function() {

  return function(ctx) {
    function init($el) {
      var $name = $('<span class="name"></span>').appendTo($el),
          $status = $('<span class="status"></span>').appendTo($el);
      $name.text("unnamed report");

      function reset_status() {
        $status.text("*");
      }

      function clear_status() {
        $status.text("");
      }

      function reset_name() {
        set_name("unnamed reports");
      }

      function set_name(name) {
        $name.text(name);
      }

      ctx.on("chart.state.reset", reset_name);
      ctx.on("chart.name.set", set_name);
      ctx.on("chart.state.change", reset_status);

      reset_name();
      reset_status();
    }

    ctx.on("view.editor.toolbar-main", init);
  };
});