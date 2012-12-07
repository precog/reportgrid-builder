define([
    "jquery"
  , "lib/util/view/editors/fileeditor"
  , "lib/util/ui"
],

function($, createFileEditor, ui) {
  return function(success, title, message, validation, cancel) {
    title = title || "upload file";
    message = message || "please select a file to upload";
    validation = validation || function() { return null; };
    cancel = cancel || function() {};

    // open window
    var $dialog = $('<div><div class="message">'+message+'</div><div class="upload"></div></div>')
          .appendTo("body")
          .dialog({
              title : title
            , modal : true
            , autopen : true
            , resizable : false
            , dialogClass : "rg-el"
            , closeOnEscape: true
            , buttons : [{
                text : "OK",
                click : function() {
                  $dialog.dialog("close");
                  success(editor.value.get());
                  return true;
                },
                ref : "ok"
              }, {
                text : "Cancel",
                click : function() {
                  $dialog.dialog("close");
                  if(cancel)
                    cancel();
                },
                ref : "cancel"
              }]

          }),
        editor = createFileEditor($dialog.find(".upload"), {
          validate : validation
        }),
        $ok = $dialog.dialog("widget").find('button[ref="ok"]').button("disable")
      ;

    editor.value.on("value.validationError", function() {
      editor.el.find(".error").addClass("ui-state-error ui-corner-all");
      $ok.button("disable");
    });
    editor.value.on("value.change", function() {
      $ok.button("enable");
    });
  };
});