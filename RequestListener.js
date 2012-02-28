
var fs = require("fs");
//var path = fs.realpathSync("");
var realPath = "";

/**
* @class
* @constructor
* @param {Object} mapping
*/
function RequestListener( mapping ){
	this.mapping_ = mapping;
};

RequestListener.prototype.process = function( request, response ){
	//console.log(request);
	var url = request.url.replace(/\?.*$/,"");

	if( this.mapping_[ url ] ){
		this.forwardAction_( request, response, this.mapping_[ url ] );
		return;
	}

	for( var pattern in this.mapping_ ){
		var regExp = new RegExp( pattern );
		if( regExp.test( url ) ){
			this.forwardAction_( request, response, this.mapping_[ url ] );

			break;
		}
	}
	response.end("");
};

RequestListener.prototype.forwardAction_ = function( request, response, path ){
	if( path === undefined )
		return;

	var Action = require( path );
	var action = new Action();
	action.init( request, response, realPath, function(){
		action.execute();
	});
};

module.exports = RequestListener;

