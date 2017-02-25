(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-striped table-bordered table-hover center\">\n  <thead>\n  	<tr>\n  	  <th class=\"center\">Name</th>\n  	  <th class=\"center\">Address</th>\n  	  <th class=\"center\">Average Score</th>\n  	</tr>\n  </thead>\n  <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.Places : depth0)) != null ? stack1.places : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </tbody>\n</table>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <tr>\n        <td class=\"col-xs-4\"><a title=\"view recent inspections\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.business_id || (depth0 != null ? depth0.business_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"business_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.business_name || (depth0 != null ? depth0.business_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"business_name","hash":{},"data":data}) : helper)))
    + "</a></td>\n        <td class=\"col-xs-4\"><a title=\"Opens in Google Maps\" target=\"_blank\" href=\"https://www.google.com/maps/place/"
    + alias4(((helper = (helper = helpers.business_address || (depth0 != null ? depth0.business_address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"business_address","hash":{},"data":data}) : helper)))
    + ",Anchorage,AK\">"
    + alias4(((helper = (helper = helpers.business_address || (depth0 != null ? depth0.business_address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"business_address","hash":{},"data":data}) : helper)))
    + "</a></td>\n        <td class=\"col-xs-4\">"
    + ((stack1 = (helpers.formatScore || (depth0 && depth0.formatScore) || alias2).call(alias1,(depth0 != null ? depth0.AVG_inspection_score : depth0),{"name":"formatScore","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      </tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "  <div class=\"alert alert-danger center\" role=\"alert\">No results found</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.Places : depth0)) != null ? stack1.places : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();