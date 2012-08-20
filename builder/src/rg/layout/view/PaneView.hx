package rg.layout.view;

import rg.core.View;

class PaneView extends View
{
	var cls : String;

	override function init()
	{
		super.init();
		element.addClass("rgb-pane");
		if(null != cls)
			element.addClass(cls);
	}
}