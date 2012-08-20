package twitter;

import jQuery.JQuery;
using thx.core.Defaults;

class Bootstrap
{
	public static inline function dropdown(el : JQuery) : Dropdown
	{
		return untyped el.dropdown();
	}

	public static function navbar(container : JQuery) : Navbar
	{
		var el = new JQuery('<div class="navbar"><div class="navbar-inner"><div class="container"></div></div></div>'),
			content = el.find('div.container');
		container.append(el);
		return cast content;
	}
}

class JQHelper
{
	public static inline function create(el : JQuery, html : String) : Dynamic
	{
		var newel = new JQuery(html);
		el.append(newel);
		return newel;
	}
}

using twitter.Bootstrap.JQHelper;

extern class Navbar extends JQuery
{

	public inline function addBrand(label : String, ?href : String = "#") : JQuery
	{
		return this.create(Std.format('<a href="$href" class="brand"${href == "#" ? "" : " target=\\"_blank\\""}>$label</a>'));
	}

	public inline function addMenu(?leftAligned : Bool = true) : FirstMenu
	{
		return this.create(Std.format('<ul class="nav${leftAligned ? "" : " pull-right"}"></ul>'));
	}
}

extern class FirstMenu extends JQuery
{
	public inline function addMenu(?label : String = "", ?href : String = "#") : Menu
	{
		var html = Std.format('<li class="dropdown"><a href="$href" class="dropdown-toggle" data-toggle="dropdown">$label<b class="caret"></b></a><ul class="dropdown-menu"></ul>'),
			li = this.create(html);
		return li.find("ul:last");
	}
	public inline function addDivider() : JQuery
	{
		return this.create(Std.format('<li class="divider-vertical"></li>'));
	}
	public inline function addItem(?label : String = "", ?href : String = "#") : JQuery
	{
		return this.create(Std.format('<li><a href="$href">$label</a></li>'));
	}
}

extern class Menu extends JQuery
{
	public inline function addItem(?label : String = "", ?href : String = "#") : JQuery
	{
		return this.create(Std.format('<li><a href="$href">$label</a></li>'));
	}
	public inline function addDivider() : JQuery
	{
		return this.create(Std.format('<li class="divider"></li>'));
	}
}

extern class Dropdown extends JQuery
{

}