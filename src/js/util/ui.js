define([
    'jquery'
  , 'util/dom'
  , 'util/notification'
  , 'util/uid'
  , 'util/widget/menu'
  , 'lib/jquery-ui/jquery.ui'
],

function($, dom, notification, uid) {
  var wrapper;

  $.fn.outerHTML = function(){
    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML || (
      function(el){
        var div = document.createElement('div');
        div.appendChild(el.cloneNode(true));
        var contents = div.innerHTML;
        div = null;
        return contents;
      })(this[0]));
  }

  return wrapper = {
    clickOrDoubleClick : function(el, clickHandler, dblClickHandler) {
      var sequence = 0;
      el.click(function(e) {
        sequence++;
        if(sequence === 1) {
          setTimeout(function() {
            if(sequence !== 1) {
              sequence = 0;
              return;
            }
            sequence = 0;
            clickHandler.call(this, e);
          }, 200);
        } else {
          sequence = 0;
          dblClickHandler.call(this, e);
        }
      });
    },
    button : function(el, o) {
      el = $(el);
      o = $.extend({
        disabled : false,
        label : "",
        text : false,
        handler : function() {},
        icons : null
      }, o);

      var options = {
        disabled : o.disabled,
        text: o.text,
        label: o.label,
        icons: o.icon ? { primary : o.icon } : o.icons
      };

      if(!options.icons) delete options.icons;

      var button = el.append('<button></button>')
        .find('button:last')
        .button(options)
        .click(function(e) {
          o.handler.apply(button.get(0));
          e.preventDefault(); return false;
        });
      if(o.description)
        wrapper.tooltip(button, o.description);
      return button;
    },
    menu : function(el, o) {
      el = $(el);
      o = $.extend({
        disabled : false
      }, o);
      var menu = el.menu({
        disabled: o.disabled
      });
      menu.find("ul").addClass("ui-menu");
      return menu;
    },
    contextmenu : function(el, o) {
      el = $(el);
      el.addClass("context-menu");
      $("body").append(el);
      var menu = this.menu(el, o),
          show = menu.show;
      menu.show = function() {
        $("body").one("click", function() {
          menu.hide();
        });
        show.apply(menu, arguments);
      };

      return menu;
    },

    tabs : function(el, o) {
      el = $(el);
      return el.tabs(o);
    },
    radios : function(el, actions) { /* group, label, handler */
      var current;
      el = $(el);
      if(actions) {
        el.find("*").remove();
        $(actions).each(function(i, action) {
          var name = action.group,
              id = "buttonset-" + uid() + "-" + i,
              label = action.label;
          action.btn = el.append('<input type="radio" id="'+id+'" name="'+name+'" '+(action.checked ? 'checked="checked" ' : '')+'/><label for="'+id+'">'+label+'</label>').find("#"+id);
          action.btn.click(function() {
            $(actions).each(function(i, a) {
                a.checked = a.token === action.token;
            });
            action.handler(action);
          });
          if(action.checked)
            current = action.btn;
          if(action.description)
            wrapper.tooltip(btn, action.description);
        });
      }
      var buttons = el.buttonset();
      if(current) {
        setTimeout(function() {
          current.click();
        }, 100);
      }
      return buttons;
    },
    checks : function(el, actions) { /* group, label, handler */
      el = $(el);
      if(actions) {
        el.find("*").remove();
        $(actions).each(function(i, action) {
          var name = action.name || "",
              checked = action.checked || false,
              id = "buttonset-" + uid() + "-" + i,
              label = action.label;
          var btn = el.append('<input type="checkbox" id="'+id+'" name="'+name+'" '+(checked ? 'checked="checked" ' : "")+'/><label for="'+id+'">'+label+'</label>').find("#"+id);
          btn.click(function(e) {
            action.checked = !!btn.attr("checked");
            if(action.handler)
              action.handler.call(btn, e, action);
          });
          if(action.description)
            wrapper.tooltip(btn, action.description);
        });
      }
      return el.buttonset();
    },
    buttonset : function(el) {
      el = $(el);
      return el.buttonset();
    },
    progressbar : function(el) {
      el = $(el);
      return el.progressbar();
    },
    tooltip : function(el, html) {
      var f = "function" === typeof html ? html : function() { return html; };
      $(el).attr("title", f.apply($(el), []));
      return el;
    },
    edit : function(el, options) {
      el = $(el);
      options = $.extend({
        handler : function(t) { return null; },
        cancel : function() { }
      }, options);
      var text = options.text || el.text().trim(),
        html = el.html(),
        edit = el.html('<input type="text" name="editable" id="editable" value="'+text+'" />').find("#editable"),
        tip;

      function exit() {
        if(tip) tip.remove();
        el.html(html);
        options.cancel();
      }

      $(document.body).one("mousedown", function() { exit(); });
      edit.change(function() {
          var newtext = edit.val();
          if(newtext === text) {
            return exit();
          }
          options.handler(newtext, function(error) {
            if(tip) tip.remove();
            if(error) {
              tip = notification.tip("invalid value", {
                target : el,
                text : error,
                type : "error"
              });
              return;
            } else {
              el.html(newtext);
            }
          });
        })
        .keyup(function(e) {
          switch(e.which) {
            case 9:
            case 13:
              edit.trigger("change");
              break;
            case 27:
              exit();
              break;
          }
        });
      edit.focus();
      var selectable = el.get(0);
      if(!dom.canSelect(selectable))  // firefox doesn't like selecting text this way
        selectable = edit.get(0);
      dom.selectText(selectable, 0, text.length);
    },
    selectmenu : function(el, o) {
      o = $.extend({
        format : function(d) { return JSON.stringify(d); },
        position : {
          menu : "right top",
          at : "right top"
        }
      }, o);
      var trigger = $('<div class="selectmenu ui-buttonset"><button class="label ui-button ui-widget ui-state-default ui-button-text-only ui-corner-all"><span class="ui-button-text text"></span><span class="ui-icon ui-icon-triangle-1-s dropdown"></span></button></div>'),
          triggerLabel = trigger.find(".label span.text"),
          index   = ("undefined" !== typeof o.selectedIndex && o.selectedIndex) || -1;
      function selectMessage()
      {
        return o.selectMessage || "select an option";
      }

      function selectIndex(i, force) {
        if(!force && index === i) return;
        index = i;
        var content = i < 0 ? selectMessage() : o.selectedFormat ? o.selectedFormat(o.data[index]) : o.format(o.data[index]);
        triggerLabel.html(content);
      }

      el.append(trigger);

      selectIndex(index, true);

      trigger.find("button")
        .mouseover(function() { $(this).addClass("ui-state-hover"); })
        .mouseout(function() { $(this).removeClass("ui-state-hover"); })
      ;

      var moptions = {
        target : triggerLabel,
        items  : o.data.map(function(item) {
          return {
            content : o.format(item),
            data    : item
          }
        })
      };
      if(o.width)
        moptions.width = o.width + "px";
      var menu = notification.menu(moptions);
      menu.hide();
      $(menu).on("select", function(e, item, i) {
console.log("select", item, i);
        selectIndex(i);
      });

      trigger.click(function() {
        menu.show();
        menu.position({
          my : o.position.menu,
          at : o.position.at,
          of : trigger.find("button:first")
        });
      });

      return {
          select : function(index) { selectIndex(index); }
        , getSelected : function() { return index; }
        , reset : function() { selectIndex(-1); }
      };
    }
  };
});