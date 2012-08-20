package rg.layout.view;

import rg.widget.DisplayBox;
import rg.widget.FontIcon;

class ControlMainPaneView extends PaneView
{
	@:keep
	public function new()
	{
		cls = "rgb-pane-controls-main";
		super();

		var box = DisplayBox.create("type");
		var item = box.addItem("Bar Chart");
		item.itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		var box = DisplayBox.create("x");
		box.addItem("Timestamp").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		var box = DisplayBox.create("y");
		box.addItem("Count").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		var box = DisplayBox.create("color");
		box.addItem("Browser").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		box = DisplayBox.create("...");
		box.addItem("&nbsp;").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		box = DisplayBox.create("dimensions");
		box.addItem("Browser").itemContext.append(FontIcon.createSmall("ok"));
		box.addItem("OS").itemContext.append(FontIcon.createSmall("ok"));
		box.addItem("CPM").itemContext.append(FontIcon.createSmall("ok"));
		box.addItem("TimeStamp").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);
	}
}