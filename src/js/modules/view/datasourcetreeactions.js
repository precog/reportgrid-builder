define([
    "jquery"
  , "lib/util/ui"
],

function($, ui) {
  return function(ctx) {

    function init(bar) {
      var $delete = ui.button(bar, {
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
            ctx.trigger("data.folder.remove", path);
        }
      }

      function delete_datasource(path) {
        return function() {
          if(window.confirm("Are you sure you want to delete the datasource at \"" + path + "\"?\nThis operation is not undoable."))
            ctx.trigger("data.datasource.removebypath", path);
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

            ctx.on("datasource.path.validate", function(response) {
              if(response.valid) {
                ctx.trigger("data.folder.add", npath);
              } else {
                alert("Unable to create the folder \""+name+"\": " + response.reason);
              }
            });
          }
        }
      }

      $newfolder.on("click", create_folder("/"));

      ctx.on("data.folder.select", function(path) {
        $newfolder
          .button("enable")
          .off("click")
          .on("click", create_folder(path))
        ;
      });

      ctx.on("data.folder.deselect", function(path) {
        $newfolder.button("disable");
      });

      ctx.on("data.folder.current", function(path) {
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

      ctx.on("data.datasource.current", function(path) {
        $delete
          .button("enable")
          .off("click")
          .on("click", delete_datasource(path))
        ;
      });
    }

    ctx.one("view.data.toolbar-context", init);
  };
});