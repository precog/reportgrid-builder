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
		var box = DisplayBox.create("size");
		box.addItem("480x240").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		element.append('<p class="rgb-header rgb-display-box-title">Chart Options</p>');
		var box = DisplayBox.create("effect");
		box.addItem("gradient 1.1").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		var box = DisplayBox.create("stacked");
		var item = box.addItem();
		item.itemContext.append(FontIcon.createSmall("ok"));
//		FontIcon.create("ok").appendTo(item.element);

		var icon = FontIcon.createSmall("ok");
		icon.click(function() {
trace("clicking");
			icon.toggleIcon("ok", "remove");
		});
		item.append(icon);
/*
		FontIcon.createTiny("ok").appendTo(item.element);
		FontIcon.create("ok").appendTo(item.element);
		FontIcon.createLarge("ok").appendTo(item.element);
		FontIcon.createHuge("ok").appendTo(item.element);
*/
		element.append(box);
	}
}