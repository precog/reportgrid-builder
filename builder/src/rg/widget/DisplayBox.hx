package rg.widget;

import jQuery.JQuery;

class DisplayBox extends Widget
{
	public var label(default, null) : JQuery;
	var divider : JQuery;
	var box : JQuery;

	public function new(content : String)
	{
		super();
		element.addClass("rgb-display-box");
		label   = new JQuery(Std.format('<div class="rgb-label">$content</div>'));
		divider = new JQuery('<div class="rgb-divider"><div class="rgb-divider-top"></div><div class="rgb-divider-bottom"></div></div>');
		box     = new JQuery('<div class="rgb-box"></div>');
		element.append(label);
		element.append(divider);
		element.append(box);
	}

	public function addItem(?content : String = "")
	{
		var item = new DisplayItem(content);
		item.appendTo(box);
		return item;
	}
}

class DisplayItem extends Widget
{
	public var display(default, null) : JQuery;
	public var context(default, null) : JQuery;
	public function new(content : String)
	{
		super();
		element.addClass("rgb-display-item");
		context = new JQuery('<div class="rgb-item-context"></div>');
		display = new JQuery(Std.format('<div class="rgb-item-display">$content</div>'));
		element.append(context);
		element.append(display);
	}
}