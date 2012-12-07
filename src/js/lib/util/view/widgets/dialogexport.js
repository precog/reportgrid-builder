define([
    "jquery"
  , "text!templates/dialog.export.html"
  , "lib/util/ui"
  , "lib/util/dom"
  , "lib/util/notification"
  , 'ext/jquery-ui/jquery.ui'
  , 'ext/zclip/jquery.zclip'
],

function($, tplDialog, ui, dom, notification) {
  var  elText, elDialog, elActions, elForm, clip, formCallback, currentAction;

  function selectCode() {
    setTimeout(function() { dom.selectText(elText.get(0)); }, 100);
  }

  function reposition() {
    elDialog.dialog("option", "position", "center");
  }
  function init() {
    var buttons = [{
      text : "Copy",
      click : function() {
        elDialog.dialog("close");
        return true;
      }
    }];
    buttons.push({
      text : "Download",
      click : function() {
        /*
        notification.quick("code downloaded");
        elForm.submit();
        elDialog.dialog("close");
        */
      }
    });
    elDialog = $('body')
      .append(tplDialog)
      .find('.rg-dialog-export')
      .dialog({
        modal : true
        , autoOpen : false
        , resizable : false
        , width : 820
        , height : 480
        , dialogClass : "rg-el"
        , closeOnEscape: true
        , buttons : buttons
      }),
      elActions = elDialog.find(".rg-actions"),
      elOptions = elDialog.find(".rg-options"),
      elText = elDialog.find(".rg-export textarea"),
      elForm = elDialog.find("form");

//    elForm.attr("action", downloadQueryService);
    elForm.submit(function(e) {
      // TODO NEED TO USE THE LOCAL DOWNLOAD
      if(formCallback)
        return formCallback.call(this, elText.text(), currentAction);
      else
        return true;
    });

    elText.click(function() {
      selectCode();
    });

    elDialog.bind("dialogopen", function() { $(window).on("resize", reposition); });
    elDialog.bind("dialogclose", function() { $(window).off("resize", reposition); });
  }

  var inited = false;
  return function(title, actions, code, selected, callback) {
    formCallback = callback;
    if(!inited) {
      init();
      inited = true;
    }
    elActions.find("*").remove();
    elOptions.find("*").remove();

    function execute(action) {
      elDialog.find("input[name=name]").val("precog." + action.token);
      elOptions.find("*").remove();
      if(action.buildOptions) {
        action.buildOptions(elOptions, function() {
          elText.text(action.handler(code, action.options));
          selectCode();
        });
      }
      elText.text(action.handler(code, action.options));
      selectCode();
    }

    selected = selected || actions[0].token;
    ui.radios(elActions, $(actions).map(function(i, action) {
      if(action.token === selected)
        currentAction = action;
      return {
        label : action.name
        , handler : function() {
          currentAction = action;
          execute(action);
          return true;
        }
        , group : "actions"
        , checked : action.token === selected
      };
    }));

    elActions.find(".ui-button:first").click();

    elDialog.dialog("option", "position", "center");
    elDialog.dialog("option", "title", title);
    elDialog.dialog("open");

    if(clip) {
      $(window).trigger("resize"); // triggers reposition of the Flash overlay
    } else {
      clip = elDialog.dialog("widget").find('.ui-dialog-buttonpane button.ui-button:first')
        .css({ zIndex : 1000000 })
        .zclip({
          path:'js/ext/zclip/ZeroClipboard.swf',
          copy:function(){
            return ""+elText.val();
          },
          afterCopy : function() {
            notification.quick("copied to clipboard");
          }
        });
    }
  };
});