package rg.layout.view;

import rg.widget.DisplayBox;
import rg.widget.FontIcon;

class ControlSecondaryPaneView extends PaneView
{
	@:keep
	public function new()
	{
		cls = "rgb-pane-controls-secondary";
		super();

		element.append('<p class="rgb-header rgb-display-box-title">General Options</p>');
		var box = new DisplayBox("size");
		FontIcon.createSmall("ok").appendTo(box.addItem("480x240").context);
		box.appendTo(element);

		element.append('<p class="rgb-header rgb-display-box-title">Chart Options</p>');
		var box = new DisplayBox("effect");
		FontIcon.createSmall("ok").appendTo(box.addItem("gradient 1.1").context);
		box.appendTo(element);

		var box = new DisplayBox("stacked");
		var item = box.addItem();
		FontIcon.createSmall("ok").appendTo(item.context);
//		FontIcon.create("ok").appendTo(item.element);

		var icon = FontIcon.createSmall("ok");
		icon.click(function() {
trace("clicking");
			icon.toggleIcon("ok", "remove");
		});
		item.element.append(icon);
/*
		FontIcon.createTiny("ok").appendTo(item.element);
		FontIcon.create("ok").appendTo(item.element);
		FontIcon.createLarge("ok").appendTo(item.element);
		FontIcon.createHuge("ok").appendTo(item.element);
*/
		box.appendTo(element);
	}
}