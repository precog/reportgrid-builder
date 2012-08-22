package rg.datasource;

import mmvc.impl.Context;
import rg.app.model.Dimension;

class StaticDataSourceModule implements rg.core.IModule
{
	var loader : (Array<Dynamic> -> Void) -> Void;
	var models : (Array<Dimension> -> Void) -> Void;
	public function new(loader : (Array<Dynamic> -> Void) -> Void, models : (Array<Dimension> -> Void) -> Void)
	{
		this.loader = loader;
		this.models = models;
	}

	public function register(context : Context)
	{
		loader(function(data) trace(data));
		
	}
}