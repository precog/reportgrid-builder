package rg.layout.view;

import jQuery.JQuery;
import rg.widget.DisplayBox;
import rg.widget.FontIcon;
import rg.widget.Widget;
import rg.widget.JQueryRef;

class ControlMainPaneView extends PaneView
{
	public var dimensionsContainer(default, null) : JQuery;
	@inject("dimensions-container")
	@:keep
	public function new(?dimensionsContainer : JQueryRef)
	{
		cls = "rgb-pane-controls-main";
		if(null != dimensionsContainer)
			this.dimensionsContainer = dimensionsContainer.ref;
		super();
	}

	override function init() {
		super.init();
		var box = DisplayBox.create("type");
		var item = box.addItem("Bar Chart");
		item.itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		var box = DisplayBox.create("x");
		box.addItem("Timestamp").itemContext.append(FontIcon.createSmall("ok"));
		element.append(box);

		var box = DisplayBox.create("y");
		box.addItem("Count").itemContext.append(FontIcon.createSmall("comment-alt"));
		element.append(box);

		var box = DisplayBox.create("color");
		box.addItem("Browser").itemContext.append(FontIcon.createSmall("bell"));
		element.append(box);

		box = DisplayBox.create("...");
		box.addItem("&nbsp;").itemContext.append(FontIcon.createSmall("globe"));
		element.append(box);

		if(null == dimensionsContainer)
		{
			element.append(dimensionsContainer = Widget.create());
		}
		var box = DisplayBox.create("dimensions");
		box.addItem("Browser").itemContext.append(FontIcon.createSmall("ok"));
		box.addItem("OS").itemContext.append(FontIcon.createSmall("undo"));
		box.addItem("CPM").itemContext.append(FontIcon.createSmall("ok"));
		box.addItem("TimeStamp").itemContext.append(FontIcon.createSmall("ok"));
		dimensionsContainer.append(box);
	}}