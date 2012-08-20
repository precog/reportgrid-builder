package rg.layout.view;

import jQuery.JQuery;
import rg.core.View;

class LayoutView extends View
{
	override function init()
	{
		super.init();
		element.addClass("rg-builder");
	}
}