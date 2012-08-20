package rg.app.model;

using thx.core.Defaults;
using thx.text.Transform;

class Dimension
{
	var id : String;
	var description : String;
	public function new(id : String, ?description : String)
	{
		this.id = id;
		this.description = description.def(id.humanize());
	}
}