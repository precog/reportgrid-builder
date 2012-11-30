define([
    "jquery"
  , "lib/util/ui"
],

function($, ui) {
  return function(ctx) {

    function initContext(bar) {
      var $delete = ui.button(bar, {
            icon : "ui-icon-trash",
            disabled : true
          }),
          $newfolder = ui.button(bar, {
            icon : "ui-icon-new-folder",
            disabled : false
          });

      function deleteFolder(path) {
        return function() {
          if(window.confirm("Are you sure you want to delete the folder \"" + path + "\" and all of its contents?\nThis operation is not undoable."))
            ctx.trigger("reports.folder.remove", path);
        }
      }

      function deleteDatasource(path) {
        return function() {
          if(window.confirm("Are you sure you want to delete the report at \"" + path + "\"?\nThis operation is not undoable."))
            ctx.trigger("reports.report.removebypath", path);
        }
      }

      function createFolder(path) {
        return function() {
          var name = window.prompt("Create a new folder at: \"" + path + "\"");
          if(name === null)
            reutrn;
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

      $newfolder.on("click", createFolder("/"));

      ctx.on("reports.folder.select", function(path) {
        $newfolder
          .button("enable")
          .off("click")
          .on("click", createFolder(path))
        ;
      });

      ctx.on("reports.folder.deselect", function(path) {
        $newfolder.button("disable");
      });

      ctx.on("reports.folder.current", function(path) {
        if(path === "/") {
          $delete.button("disable");
        } else {
          $delete
            .button("enable")
            .off("click")
            .on("click", deleteFolder(path))
          ;
        }
      });

      ctx.on("reports.report.current", function(path) {
        $delete
          .button("enable")
          .off("click")
          .on("click", deleteDatasource(path))
        ;
      });
    }

    function initMain(bar) {
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

      function stateChange(state) {
        if(working) return;
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
              $save.off("click");
              ctx.trigger("reports.report.add", currentPath, state);
            });
            ctx.trigger("request.report.path.validate", currentFolder+name);
          } else {
            $save.button("disable");
            ctx.trigger("reports.report.change", currentPath, state);
          }
        });
        $save.button("enable");
      }

      ctx.on("chart.state.change", stateChange);

      ctx.on("chart.state.reset", function() {
        currentPath = null;
        $save.button("disable");
      });
    }

    ctx.on("view.reports.toolbar-context", initContext);
    ctx.on("view.editor.toolbar-context", initMain);
  };
});