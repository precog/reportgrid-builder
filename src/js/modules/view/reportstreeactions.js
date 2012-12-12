define([
    "jquery"
  , "lib/util/ui"
],

function($, ui) {
  return function(ctx) {

    function init_context(bar) {
      var $open = ui.button(bar, {
            icon : "ui-icon-query",
            disabled : true
          }),
          $import = ui.button(bar, {
            icon : "ui-icon-arrowthickstop-1-n",
            disabled : false
          }),
          $export = ui.button(bar, {
            icon : "ui-icon-arrowthickstop-1-s",
            disabled : true
          }),
          $delete = ui.button(bar, {
            icon : "ui-icon-trash",
            disabled : true
          }),
          $newfolder = ui.button(bar, {
            icon : "ui-icon-new-folder",
            disabled : false
          });

      function delete_folder(path) {
        return function() {
          if(window.confirm("Are you sure you want to delete the folder \"" + path + "\" and all of its contents?\nThis operation is not undoable."))
            ctx.trigger("reports.folder.remove", path);
        }
      }

      function delete_report(path) {
        return function() {
          if(window.confirm("Are you sure you want to delete the report at \"" + path + "\"?\nThis operation is not undoable."))
            ctx.trigger("reports.report.removebypath", path);
        }
      }

      function open_report(path) {
        return function() {
          ctx.trigger("reports.report.openpath", path);
        }
      }

      function import_report(path) {
        return function() {
          ctx.trigger("reports.report.importpath", path);
        }
      }

      function export_report(path) {
        return function() {
          ctx.trigger("reports.report.exportpath", path);
        }
      }

      function create_folder(path) {
        return function() {
          var name = window.prompt("Create a new folder at: \"" + path + "\"");
          if(name === null)
            return;
          name = name.trim();
          if(!name) {
            alert("the new folder cannot have an empty name");
          } else {
            var npath = path;
            if(npath.substr(-1) !== "/") npath += "/";
            npath += name;

            ctx.on("response.report.path.validated", function(vpath, valid, reason) {
              if(npath !== vpath) return;
              if(valid) {
                ctx.trigger("reports.folder.add", npath);
              } else
                alert("Unable to create the folder \""+name+"\": " + reason);
            });

            ctx.trigger("request.report.path.validate", npath);
          }
        }
      }

      $newfolder.on("click", create_folder("/"));
      $import.on("click", import_report("/"));

      ctx.on("reports.folder.select", function(path) {
        $newfolder
          .button("enable")
          .off("click")
          .on("click", create_folder(path))
        ;
        $import.button("enable")
          .off("click")
          .on("click", import_report(path))
        ;
      });

      ctx.on("reports.folder.deselect", function(path) {
        $newfolder.button("disable");
        $import.button("disable");
      });

      ctx.on("reports.folder.current", function(path) {
        if(path === "/") {
          $delete.button("disable");
        } else {
          $delete
            .button("enable")
            .off("click")
            .on("click", delete_folder(path))
          ;
        }
      });

      ctx.on("reports.report.deselect", function(path) {
        $open.button("disable");
        $export.button("disable");
        $delete.button("disable");
      });

      ctx.on("reports.report.current", function(path) {
        $delete
          .button("enable")
          .off("click")
          .on("click", delete_report(path))
        ;
        $open
          .button("enable")
          .off("click")
          .on("click", open_report(path))
        ;
        $export
          .button("enable")
          .off("click")
          .on("click", export_report(path))
      });
    }

    function init_main(bar) {
      var currentFolder = "/",
          currentPath,
          working = false,
          $save = ui.button(bar, {
            icon : "ui-icon-disk",
            disabled : true
          });

      ctx.on("reports.folder.select", function(path) {
        currentFolder = path;
        if(currentFolder.substr(-1) !== "/")
          currentFolder += "/";
      });

      function enable_state_change() {
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
          ctx.off("chart.state.change", enable_state_change);
          ctx.on("chart.state.change", state_change);
        }, 750);
      }
      
      function open_path(path) {
        ctx.off("chart.state.change", state_change);
        ctx.on("chart.state.change", enable_state_change);
        currentPath = path;
        $save.button("disable");
      }

      function state_change(state) {
        if(working) return;
        $save.off("click");
        $save.on("click", function() {
          if(!currentPath) {
            var name = window.prompt("Please input a name for the current chart");
            if(null === name) {
              return;
            }
            $save.button("disable");
            working = true;
            ctx.on("response.report.path.validated", function(path, valid, reason) {
              if(path !== currentFolder+name)
                return;
              working = false;
              if(!valid) {
                alert("Invalid report name: " + reason);
                $save.button("enable");
                return;
              }
              currentPath = path;
              ctx.trigger("reports.report.add", currentPath, state);
              ctx.trigger("chart.name.set", name);
            });
            ctx.trigger("request.report.path.validate", currentFolder+name);
          } else {
            $save.button("disable");
            ctx.trigger("reports.report.update", currentPath, state);
          }
        });
        $save.button("enable");
      }

      ctx.on("chart.state.change", state_change);
      ctx.on("reports.report.openpath", open_path);

      ctx.on("chart.state.reset", function() {
        currentPath = null;
        $save.button("disable");
      });
    }

    ctx.on("view.reports.toolbar-context", init_context);
    ctx.on("view.editor.toolbar-context", init_main);
  };
});