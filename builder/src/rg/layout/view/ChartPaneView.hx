package rg.layout.view;

class ChartPaneView extends PaneView
{
	@:keep
	public function new()
	{
		cls = "rgb-pane-chart";
		super();
		element.append('<img src="images/fake-chart.png" style="max-width:480px;height:240px">');
	}
}