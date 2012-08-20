package rg.layout.view;

import jQuery.JQuery;
import twitter.Bootstrap;

class MenuPaneView extends PaneView
{
	public var bar(default, null) : Navbar;
	public var brand(default, null) : JQuery;
	public var menu(default, null) : FirstMenu;
	public var menuContext(default, null) : FirstMenu;

	@:keep
	public function new()
	{
		cls = "rgb-pane-menu";
		super();
	}

	override function init()
	{
		super.init();
		bar = Bootstrap.navbar(element);
		brand = bar.addBrand("RG Builder", "http://www.reportgrid.com/");
		menu = bar.addMenu();
//		menu.addDivider();
		menuContext = bar.addMenu(false);
	}
}