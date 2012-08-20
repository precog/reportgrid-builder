package rg.app.view;

import mmvc.impl.Actor;
import msignal.Signal;

class ApplicationSize extends Actor
{
	public var width(default, null) : Int;
	public var height(default, null) : Int;
	public var resize(default, null) : Signal2<Int, Int>;
	public function new()
	{
		width = 0;
		height = 0;
		resize = new Signal2();
		resize.add(function(w, h) {
			width  = w;
			height = h;
		});
		super();
	}
}