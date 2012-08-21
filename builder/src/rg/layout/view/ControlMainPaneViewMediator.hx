package rg.layout.view;

import jQuery.JQuery;
using jQuery.plugins.jQuerypp.JQuerypp;
import mmvc.impl.Mediator;
import rg.app.view.ApplicationSize;
import rg.widget.JQueryRef;
import rg.widget.Widget;

class ControlMainPaneViewMediator extends Mediator<ControlMainPaneView>
{
	@:keep
	public function new()
	{
		super();
	}

	override function onRegister()
	{
		super.onRegister();

//		view.fakeDimensions();
	}

	override public function onRemove():Void
	{
		super.onRemove();
	}
}