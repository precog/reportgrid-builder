define(["jquery","lib/jquery-ui/jquery.ui"],function(e){e.widget("custom.menu",{options:{},_create:function(){this.element.addClass("rg-widget").disableSelection(),this.menu=e('<ul class="menu-items ui-widget-content"></ul>'),this.element.append(this.menu),this._refresh()},_refresh:function(){},addItem:function(t){var n=e("<li></li>");return n.append(t||""),this.menu.append(n),n},addCommand:function(t,n){var r=this.addItem(""),i=e("<a></a>").button();return n&&i.click(n),i.find(".ui-button-text").append(t),r.append(i),i},addDivider:function(){var e=this.addItem("");return e.addClass("ui-divider"),e},_destroy:function(){},_setOptions:function(){e.Widget.prototype._setOptions.apply(this,arguments),this._refresh()},_setOption:function(t,n){e.Widget.prototype._setOption.call(this,t,n)}})})