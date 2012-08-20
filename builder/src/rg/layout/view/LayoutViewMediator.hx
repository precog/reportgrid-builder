package rg.layout.view;

import jQuery.JQuery;
using jQuery.plugins.jQuerypp.JQuerypp;
import mmvc.impl.Mediator;
import rg.app.view.ApplicationSize;

class LayoutViewMediator extends Mediator<LayoutView>
{
	var applicationSize : ApplicationSize;
	var controlMainPaneView : ControlMainPaneView;
	var controlSecondaryPaneView : ControlSecondaryPaneView;
	var menuPaneView : MenuPaneView;
	var chartPaneView : ChartPaneView;

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

		this.injector.mapSingleton(MenuPaneView);
		this.injector.mapSingleton(ControlMainPaneView);
		this.injector.mapSingleton(ChartPaneView);
		this.injector.mapSingleton(ControlSecondaryPaneView);

		view.addChild(menuPaneView = injector.getInstance(MenuPaneView));
		view.addChild(controlMainPaneView = injector.getInstance(ControlMainPaneView));
		view.addChild(chartPaneView = injector.getInstance(ChartPaneView));
		view.addChild(controlSecondaryPaneView = injector.getInstance(ControlSecondaryPaneView));

		applicationSize.resize.add(resize);
	}

	/**
	@see mmvc.impl.Mediator
	*/
	override public function onRemove():Void
	{
		applicationSize.resize.remove(resize);
		super.onRemove();
	}

	function resize(w : Int, h : Int)
	{
		var el = menuPaneView.element,
			menuHeight = el.outerHeight(),
			mainHeight = h - menuHeight;

		// main menu
		setBoundaries(el, 0, 0, w, menuHeight);

		// main controls
		el = controlMainPaneView.element;
		var sidebarWidth = el.outerWidth();
		setBoundaries(el, 0, menuHeight, sidebarWidth, mainHeight);

		// chart
		el = chartPaneView.element;
		setBoundaries(el, sidebarWidth, menuHeight, w - sidebarWidth * 2, mainHeight);

		// secondary controls
		el = controlSecondaryPaneView.element;
		setBoundaries(el, w - sidebarWidth, menuHeight, sidebarWidth, mainHeight);
	}

	function setBoundaries(el : JQuery, x : Int, y : Int, w : Int, h : Int)
	{
		el.css({
			top    : y + "px",
			left   : x + "px"
		});
		el.pp()
			.outerWidth(w)
			.outerHeight(h);
	}
}