package rg.widget;

import rg.widget.Widget;

extern class FontIcon extends Widget
{
	public var type(get_type, set_type) : String;
	inline private function get_type() : String
	{
		return this.hxw.type;
	}
	inline private function set_type(newtype : String) : String
	{
		if(newtype != this.type) {
			this.removeClass("icon-"+this.type);
			this.hxw.type = newtype;
			this.addClass("icon-"+this.type);
		}
		return this.type;
	}

	inline public function toggleIcon(a : String, b : String, ?handler : String -> Void) : Void
	{
		if(this.type == a) {
			this.set_type(b);
		} else {
			this.set_type(a);
		}
		if(null != handler)
			handler(this.type);
	}

	inline private static function createIcon(type : String, version : String, tag : String) : FontIcon
	{
		var icon : FontIcon = cast Widget.create(Std.format('<$tag class="icon-size$version icon-$type"></$tag>'));
		icon.hxw.type = type;
		return icon;
	}
	inline public static function createTiny(type : String, ?tag : String = "i") : FontIcon
	{
		return createIcon(type, "-tiny", tag);
	}
	inline public static function createSmall(type : String, ?tag : String = "i") : FontIcon
	{
		return createIcon(type, "-small", tag);
	}
	inline public static function create(type : String, ?tag : String = "i") : FontIcon
	{
		return createIcon(type, "", tag);
	}
	inline public static function createLarge(type : String, ?tag : String = "i") : FontIcon
	{
		return createIcon(type, "-large", tag);
	}
	inline public static function createHuge(type : String, ?tag : String = "i") : FontIcon
	{
		return createIcon(type, "-huge", tag);
	}
}