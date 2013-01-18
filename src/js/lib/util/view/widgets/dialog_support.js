define([
    "jquery"
  , "text!templates/dialog.support.html"
  , "lib/util/ui"
  , "lib/util/dom"
  , 'ext/jquery-ui/jquery.ui'
],

function($, tplDialog, ui, dom) {
  var elDialog, currentHandler, showRequest;

  function validate(email, request) {
    var re_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re_email.test(email)) {
      return "invalid email address";
    } else if(!request.trim()) {
      return "empty support request";
    } else {
      return null;
    }
  }

  function ok(e) {
    elDialog.find(".rg-error").hide()
    var email   = elDialog.find("#rg-input-email").val(),
        request = elDialog.find("#rg-input-request").val();
    var validation_message = validate(email, request);
    if(validation_message) {
      elDialog.find(".rg-error").html(validation_message).show();
      if(e)
        e.preventDefault();
      return false;
    }
    if(currentHandler)
      currentHandler(email, request);
    elDialog.dialog("close");
  }

  function reposition() {
    elDialog.dialog("option", "position", "center");
  }

  function init() {
    elDialog = $('body')
      .append(tplDialog)
      .find('.rg-dialog-support:last')
      .dialog({
        modal : true
        , autoOpen : false
        , resizable : false
        , dialogClass : "rg-el"
        , width : "400px"
        , closeOnEscape: true
        , buttons : [{
          text : "Close",
          click : function() {
            elDialog.dialog("close");
            return true;
          }
        }, {
          text : "OK",
          click : ok
        }]
      })
    ;
    elDialog.find(".rg-email")
      .keyup(function(e) {
        if(e.keyCode == 13) {
          if(showRequest) {
            elDialog.find(".rg-request").focus();
          } else {
            ok();
          }
        }

      });

    elDialog.bind("dialogopen", function() { $(window).on("resize", reposition); });
    elDialog.bind("dialogclose", function() { $(window).off("resize", reposition); });
  }

  var inited = false;
  return function(title, message, email, request, show_request, handler) {
    if(!inited) {
      init();
      inited = true;
    }

    currentHandler = handler;
    elDialog.find(".rg-message").html(message || "");
    elDialog.find("#rg-input-email").val(email || "");
    elDialog.find("#rg-input-request").val(request || "");
    if(showRequest = show_request) {
      elDialog.find(".rg-request").show();
    } else {
      elDialog.find(".rg-request").hide();
    }

    elDialog.find(".rg-error").hide();

    elDialog.dialog("option", "position", "center");
    elDialog.dialog("option", "title", title);
    elDialog.dialog("open");
  };
});