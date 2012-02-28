
var Action = require("./Action");
var util = require("util");
var querystring = require("querystring");
var fs = require("fs");

function SigoutAction(){

}

util.inherits( SigoutAction, Action );

/**
* @Override
*/
SigoutAction.prototype.execute = function(){
    var response = this.getResponse();
	this.setCookie( "email", "" );
	response.setHeader("Location", "/");
    response.writeHead(302, {'Content-Type': 'text/html'});
    response.end("");
};

module.exports = SigoutAction;


