define([
  "jquery",
  "ext/jquery-ui/jquery.ui"
],
function($) {
  $.widget("custom.menu", {
    // default options
    options: {
/*
      red: 255,
      green: 0,
      blue: 0,
*/
      // callbacks
//      change: null,
//      random: null
    },

    // the constructor
    _create: function() {
      this.element
        // add a class for theming
        .addClass("rg-widget")
        // prevent double click to select text
        .disableSelection()
      ;
      this.menu = $('<ul class="menu-items ui-widget-content"></ul>');
/*
      this.changer = $( "<button>", {
        text: "change",
        "class": "custom-colorize-changer"
      })
        .appendTo( this.element )
        .button();
*/
      // bind click events on the changer button to the random method
      // in 1.9 would use this._bind( this.changer, { click: "random" });
/*
      var that = this;
      this.changer.bind("click.colorize", function() {
        // _bind would handle this check
        if (that.options.disabled) {
          return;
        }
        that.random.apply(that, arguments);
      });
*/
      this.element.append(this.menu);
      this._refresh();
    },

    // called when created, and later when changing options
    _refresh: function() {
      /*
      this.element.css( "background-color", "rgb(" +
        this.options.red +"," +
        this.options.green + "," +
        this.options.blue + ")"
      );

      // trigger a callback/event
      this._trigger( "change" );
      */
    },

    addItem : function(content) {
      var li = $('<li></li>');
      li.append(content || '');
      this.menu.append(li);
      return li;
    },

    addCommand : function(content, handler) {
      var li = this.addItem(''),
          button = $('<a></a>').button();
      if(handler) button.click(handler);
      button.find(".ui-button-text").append(content);
      li.append(button);
      return button;
    },

    addDivider : function() {
      var li = this.addItem('');
      li.addClass("ui-divider");
      return li;
    },

    // a public method to change the color to a random value
    // can be called directly via .colorize( "random" )
    /*
    random: function( event ) {
      var colors = {
        red: Math.floor( Math.random() * 256 ),
        green: Math.floor( Math.random() * 256 ),
        blue: Math.floor( Math.random() * 256 )
      };

      // trigger an event, check if it's canceled
      if ( this._trigger( "random", event, colors ) !== false ) {
        this.option( colors );
      }
    },
*/
    // events bound via _bind are removed automatically
    // revert other modifications here
    _destroy: function() {
      // remove generated elements
      /*
      this.changer.remove();

      this.element
        .removeClass( "custom-colorize" )
        .enableSelection()
        .css( "background-color", "transparent" );
        */
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
      // in 1.9 would use _superApply
      $.Widget.prototype._setOptions.apply( this, arguments );
      this._refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption: function( key, value ) {
      // prevent invalid color values
      /*
      if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
        return;
      }
      */
      // in 1.9 would use _super
      $.Widget.prototype._setOption.call( this, key, value );
    }
  });
});