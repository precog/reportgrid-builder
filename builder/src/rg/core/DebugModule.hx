package rg.core;

import mmvc.impl.Context;

class DebugModule implements IModule
{
	public function new()
	{
#if mconsole
		mconsole.Console.start();
#end
	}

	public function register(context : Context)
	{
	}
}