package rg.app.model;

class DimensionCollection
{
	var dimensions : Array<Dimension>
	public function new(dimensions : Array<Dimension>)
	{
		this.dimensions = dimensions;
	}

	inline public function iterator() return dimensions.iterator()
}