package rg.app.view;

import jQuery.JQuery;
import mmvc.api.IViewContainer;
import rg.core.View;
import msignal.Signal;

class ApplicationView extends View, implements IViewContainer
{
	public var resize : Signal2<Int, Int>;
	public var viewAdded : Dynamic -> Void;
	public var viewRemoved : Dynamic -> Void;

	public function new(el : JQuery)
	{
		this.resize = new Signal2();
		element = el;
		super();
	}

	override function init() {
		super.init();
		element.on("resize", function() {
			resize.dispatch(element.innerWidth(), element.innerHeight());
		});
		haxe.Timer.delay(function() new JQuery(element).resize(), 0);
	}

	override public function dispatch(event : String, ?view : View)
	{
		if(event == View.ADDED && null != viewAdded)
			viewAdded(view);
		else if(event == View.REMOVED && null != viewRemoved)
			viewRemoved(view);
		else
			super.dispatch(event, view);
	}

	// TODO: what this should do really and where is it used?
	public function isAdded(view : Dynamic):Bool
	{
		return true;
	}
}