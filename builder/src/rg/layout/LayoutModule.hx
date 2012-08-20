package rg.layout;

import rg.core.IModule;
import rg.layout.view.LayoutView;
import rg.layout.view.LayoutViewMediator;
import mmvc.impl.Context;

class LayoutModule implements IModule
{
	public function new() { }

	public function register(context : Context)
	{
		context.mediatorMap.mapView(LayoutView, LayoutViewMediator);
	}
}