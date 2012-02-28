
var querystring = require("querystring");

var formParser = {
	getParams:function( request, callback ){
		var params = querystring.parse(request.url.replace(/^.+\?/,""))
		var postString = "";
	
		request.on("data",function( chunk ){
			postString += chunk.toString("utf8");
		});
		request.on("end",function(){
			var postParams = querystring.parse(postString);
			for( var index in postParams )
			params[index] = postParams[index];

			callback( params );
		});
	}
};

exports.getParams = formParser.getParams;
