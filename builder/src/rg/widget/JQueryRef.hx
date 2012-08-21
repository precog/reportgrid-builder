package rg.widget;

import jQuery.JQuery;

@:keep class JQueryRef
{
	var ref : JQuery;
	public function new(ref : JQuery)
	{
		this.ref = ref;
	}

	public function getRef() return ref
}