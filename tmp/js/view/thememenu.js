define(["jquery","config/themes","util/ui"],function(e,t,n){function r(t,n,r){e.each(r,function(t){n.append('<li class="ui-state-disabled ui-menu-item" role="presentation"><a href="#">'+t+" themes:</a></li>"),e.each(this,function(){n.append('<li data-theme="'+this.token+'" class="ui-menu-item" role="presentation"><a href="#">'+this.name+"</a></li>")})}),n.find("li[data-theme] a").each(function(){e(this).click(function(){var n=e(this).parent().attr("data-theme");t.trigger("theme.change",n)})})}return function(i){var s=n.contextmenu('<div class="rg-widget settings-menu"></div>');r(i,s.find("ul:first"),t.groups),i.on("view.main.toolbar-context",function(t,r){n.button(r,{icon:"ui-icon-gear",description:"about me"}).click(function(){var t=e(this).offset(),n=e(this).outerWidth(),r=e(this).outerHeight();s.css({position:"absolute",top:t.top+r+"px",left:t.left+n-s.outerWidth()+"px"}).show()})}),i.on("theme.changing",function(t,n){s.find("li[data-theme]").each(function(){e(this).attr("data-theme")===n?e(this).addClass("ui-state-active"):e(this).removeClass("ui-state-active")})})}})