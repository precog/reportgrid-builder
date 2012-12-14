define([

], function() {

  return function(ctx) {
    function init($el) {
      var $name = $('<span class="name"></span>').appendTo($el),
          $status = $('<span class="status"></span>').appendTo($el);

      function reset_status() {
        $status.text("*");
      }

      function clear_status() {
        $status.text("");
      }

      function reset_name() {
        set_name("unnamed awesomeness");
      }

      function set_name(name) {
        clear_status();
        $name.text(name);
        ctx.off("chart.state.change", reset_status);
        ctx.on("chart.state.change", reset_state_change)
      }

      function report_remove(path) {
        if($name.text() === path.split("/").pop())
          reset_status();
      }

      var timer;
      function reset_state_change() {
        timer = clearInterval(timer);
        timer = setTimeout(function() {
          ctx.on("chart.state.change", reset_status);
        }, 500);
      }

      ctx.on("chart.state.reset", reset_name);
      ctx.on("chart.name.set", set_name);
      ctx.on("chart.state.change", reset_status);
      ctx.on("reports.report.update", clear_status);
      ctx.on("reports.report.remove", report_remove);

      reset_name();
      reset_status();
    }

    ctx.on("view.editor.toolbar-main", init);
  };
});