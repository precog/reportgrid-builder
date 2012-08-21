package rg.layout.view;

import jQuery.JQuery;
using jQuery.plugins.jQuerypp.JQuerypp;
import mmvc.impl.Mediator;
import rg.app.view.ApplicationSize;
import rg.widget.JQueryRef;
import rg.widget.Widget;

class ControlMainPaneViewMediator extends Mediator<ControlMainPaneView>
{
	var dimensionsContainer : JQueryRef;
	@inject("dimensionsContainer")
	@:keep
	public function new(?dimensionsContainer : JQueryRef)
	{
		this.dimensionsContainer = dimensionsContainer;
		super();
	}

	override function onRegister()
	{
		super.onRegister();
 		if(null != dimensionsContainer)
 		{
 			view.dimensionsContainer = dimensionsContainer.getRef();
		} else {
			view.element.append(view.dimensionsContainer = Widget.create());
		}

		view.fakeDimensions();
	}

	override public function onRemove():Void
	{
		super.onRemove();
	}
}