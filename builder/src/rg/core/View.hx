package rg.core;

import jQuery.JQuery;
import msignal.Signal;

class View
{
	inline public static var ADDED : String = "added";
	inline public static var REMOVED : String = "removed";

	public var parent(default, null) : View;
	public var signal(default, null) : Signal2<String, View>;

	public var element(default, null) : JQuery;
	var children : Array<View>;

	public function new()
	{
		signal = new Signal2<String, View>();
		children = [];
		init();
	}


	public function dispatch(event : String, ?view : View)
	{
		if(view == null) view = this;
		signal.dispatch(event, view);
	}

	function init()
	{
		if(null == element)
			element = new JQuery('<div></div>');
	}

	public function addChild(view : View)
	{
		view.signal.add(dispatch);
		view.parent = this;
//		view.index = children.length;

		children.push(view);

		element.append(view.element);

		dispatch(ADDED, view);
	}

	public function removeChild(view : View)
	{
		if(children.remove(view))
		{
//			var oldIndex = view.index;

//			view.remove();
			view.signal.remove(dispatch);
			view.parent = null;
//			view.index = -1;

			view.element.remove();
/*
			for(i in oldIndex...children.length)
			{
				var view = children[i];
				view.index = i;
			}
*/
			dispatch(REMOVED, view);
		}
	}

	public function toString() return Type.getClassName(Type.getClass(this)).split(".").pop()
}