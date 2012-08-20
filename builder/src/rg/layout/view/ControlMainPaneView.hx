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

		var box = new DisplayBox("type");
		FontIcon.createSmall("ok").appendTo(box.addItem("Bar Chart").context);
		box.appendTo(element);

		var box = new DisplayBox("x");
		FontIcon.createSmall("ok").appendTo(box.addItem("Timestamp").context);
		box.appendTo(element);

		var box = new DisplayBox("y");
		FontIcon.createSmall("ok").appendTo(box.addItem("Count").context);
		box.appendTo(element);

		var box = new DisplayBox("color");
		FontIcon.createSmall("ok").appendTo(box.addItem("Browser").context);
		box.appendTo(element);

		box = new DisplayBox("...");
		FontIcon.createSmall("ok").appendTo(box.addItem("&nbsp;").context);
		box.appendTo(element);

		box = new DisplayBox("dimensions");
		FontIcon.createSmall("ok").appendTo(box.addItem("Browser").context);
		FontIcon.createSmall("ok").appendTo(box.addItem("OS").context);
		FontIcon.createSmall("ok").appendTo(box.addItem("CPM").context);
		FontIcon.createSmall("ok").appendTo(box.addItem("TimeStamp").context);
		box.appendTo(element);

//		element.append('<div style="font-size: 24px;"><i class="icon-hand-up"></i></div>');
	}
}