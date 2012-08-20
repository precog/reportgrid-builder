package rg.app;

import mmvc.impl.Context;
import rg.app.model.ApplicationSize;
import rg.core.IModule;
import rg.app.view.ApplicationView;
import rg.app.view.ApplicationViewMediator;

class ApplicationModule implements IModule
{
	public function new() { }

	public function register(context : Context)
	{
		context.injector.mapValue(ApplicationSize, new ApplicationSize());
		context.mediatorMap.mapView(ApplicationView, ApplicationViewMediator);
	}
}