package rg.widget;

import jQuery.JQuery;
import rg.widget.Widget;

extern class DisplayBox extends Widget
{
	inline static function create(content : String) : DisplayBox
	{
		var widget = Widget.create();
		widget.addClass("rgb-display-box");
		widget.hxw.boxLabel   = new JQuery(Std.format('<div class="rgb-label">$content</div>'));
		widget.hxw.boxDivider = new JQuery('<div class="rgb-divider"><div class="rgb-divider-top"></div><div class="rgb-divider-bottom"></div></div>');
		widget.hxw.boxBox     = new JQuery('<div class="rgb-box"></div>');
		widget.append(widget.hxw.boxLabel);
		widget.append(widget.hxw.boxDivider);
		widget.append(widget.hxw.boxBox);
		return cast widget;
	}

	public var boxLabel(get_label, null) : JQuery;

	private inline function new(_ : Dynamic) : Void {
		super(_);
	}

	inline function addItem(?content : String = "") : DisplayItem
	{
		var item = DisplayItem.create(content);
		this.hxw.boxBox.append(item);
		return item;
	}

	inline private function get_label() : JQuery return this.hxw.boxLabel
}

extern class DisplayItem extends Widget
{
	var itemContext(get_itemContext, null) : JQuery;
	inline private function get_itemContext() : JQuery return this.hxw.itemContext
	var itemDisplay(get_itemDisplay, null) : JQuery;
	inline private function get_itemDisplay() : JQuery return this.hxw.itemDisplay

	inline static function create(content : String) : DisplayItem
	{
		var widget = Widget.create();
		widget.addClass("rgb-display-item");
		widget.hxw.itemContext = new JQuery('<div class="rgb-item-context"></div>');
		widget.hxw.itemDisplay = new JQuery(Std.format('<div class="rgb-item-display">$content</div>'));
		widget.append(widget.hxw.itemContext);
		widget.append(widget.hxw.itemDisplay);
		return cast widget;
	}
}