package rg.widget;

import jQuery.JQuery;

extern class Widget extends JQuery
{
	var hxw : Dynamic;
	public static inline function create(?html : String = '<div></div>') : Widget
	{
		var w = new JQuery(html);
		untyped w.hxw = {};
		return cast w;
	}

}