package rg.app;

import mmvc.api.IViewContainer;
import mmvc.impl.Context;
import rg.core.IModule;

class ApplicationContext extends Context
{
	var modules : Iterable<IModule>;
	public function new(contextView : IViewContainer, modules : Iterable<IModule>)
	{
		this.modules = modules;
		super(contextView);
	}

	override function startup()
	{
		for(module in modules)
			module.register(this);
	}

	override function shutdown()
	{

	}
}