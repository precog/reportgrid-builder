import jQuery.JQuery;
import rg.app.ApplicationContext;
import rg.app.view.ApplicationView;

class Main
{
	static function main()
	{
		var ReportGridAPI : Dynamic = untyped __js__("ReportGrid");
		if(null == ReportGridAPI)
		{
			throw "the ReportGrid Chart Library has not been found, be sure to include a reference to http://api.reportgrid.com/js/reportgrid-charts.js";
		}

		ReportGridAPI.builder = function(selector)
		{
			new JQuery(js.Lib.window).ready(function(_)
			{
				new JQuery(selector).each(function(index, container)
				{
					var debug   = new rg.core.DebugModule(),
						view    = new ApplicationView(new JQuery(container)),
						context = new ApplicationContext(view, [
							  debug
							, new rg.layout.LayoutModule()
							, new rg.builder.BuilderModule()
							, new rg.app.ApplicationModule()
							, new rg.datasource.StaticDataSourceModule(function() return [

								])
							]);

trace("================");
				});
			});
		}
	}
}