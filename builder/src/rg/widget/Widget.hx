package rg.widget;

import jQuery.JQuery;
import JQuery.JQueryEvent;

class Widget
{
	public var element(default, null) : JQuery;
	function new()
	{
		init();
	}

	function init()
	{
		element = new JQuery('<div></div>');
	}

	public function remove()
	{
		element.remove();
	}

	public inline function appendTo(container : JQuery)
	{
		container.append(element);
	}

	public inline function on(type : String, handler : JQueryEvent -> Void) {
		element.on(type, handler);
	}
}

extern class Widget2 extends JQuery
{
	var hxw : Dynamic;
	public static inline function create(?html : String = '<div></div>') : Widget2
	{
		var w = new JQuery(html);
		untyped w.hxw = {};
		return cast w;
	}

}