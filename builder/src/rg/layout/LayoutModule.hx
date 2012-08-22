package rg.layout;

import jQuery.JQuery;
import rg.core.IModule;
import rg.layout.view.LayoutView;
import rg.layout.view.LayoutViewMediator;
import rg.layout.view.ControlMainPaneView;
import rg.layout.view.ControlMainPaneViewMediator;
import mmvc.impl.Context;
import rg.widget.JQueryRef;

class LayoutModule implements IModule
{
	var dimensionsContainer : JQuery;
	public function new(?dimensionsContainer : Dynamic)
	{
		this.dimensionsContainer = null == dimensionsContainer ? null : new JQuery(dimensionsContainer);
	}

	public function register(context : Context)
	{
		if(null != dimensionsContainer)
			context.injector.mapValue(JQueryRef, new JQueryRef(dimensionsContainer),  "dimensions-container");
		context.mediatorMap.mapView(LayoutView, LayoutViewMediator);
		context.mediatorMap.mapView(ControlMainPaneView, ControlMainPaneViewMediator);
	}
}