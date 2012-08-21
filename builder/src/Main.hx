import jQuery.JQuery;
import rg.app.ApplicationContext;
import rg.app.view.ApplicationView;

using thx.core.Defaults;

class Main
{
	static function main()
	{
		var ReportGridAPI : Dynamic = untyped __js__("ReportGrid");
		if(null == ReportGridAPI)
		{
			throw "the ReportGrid Chart Library has not been found, be sure to include a reference to http://api.reportgrid.com/js/reportgrid-charts.js";
		}

		ReportGridAPI.builder = function(selector, ?options : { ?dimensionsContainer : Dynamic })
		{
			options.def({});
			new JQuery(js.Lib.window).ready(function(_)
			{
				new JQuery(selector).each(function(index, container)
				{
					var debug   = new rg.core.DebugModule(),
						view    = new ApplicationView(new JQuery(container)),
						context = new ApplicationContext(view, [
							  debug
							, new rg.layout.LayoutModule(options.dimensionsContainer)
							, new rg.builder.BuilderModule()
							, new rg.app.ApplicationModule()
							, new rg.datasource.StaticDataSourceModule(function() return [
									  { name : "Franco",   age : 40 }
									, { name : "Sergio",   age : 44 }
									, { name : "Sandro",   age : 43 }
									, { name : "Cristina", age : 38 }
									, { name : "Gabriel",  age : 7 }
									, { name : "Matilde",  age : 5 }
								],
								[
									  new rg.app.model.Dimension("name")
									, new rg.app.model.Dimension("age")
								])
						]);
				});
			});
		}
	}
}