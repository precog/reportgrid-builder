package rg.app.view;

import mmvc.impl.Mediator;
import rg.layout.view.LayoutView;
import rg.app.model.ApplicationSize;

class ApplicationViewMediator extends Mediator<ApplicationView>
{
	public var applicationSize : ApplicationSize;

	@:keep
	@inject
	public function new(size : ApplicationSize)
	{
		applicationSize = size;
		super();
	}

	/**
	Context has now been initialized. Time to create the rest of the main views in the application
	@see mmvc.impl.Mediator.onRegister()
	*/
	override function onRegister()
	{
		super.onRegister();
		view.addChild(new LayoutView());
		view.resize.add(applicationSize.resize.dispatch);
	}

	/**
	@see mmvc.impl.Mediator
	*/
	override public function onRemove():Void
	{
		view.resize.remove(applicationSize.resize.dispatch);
		super.onRemove();
	}
}