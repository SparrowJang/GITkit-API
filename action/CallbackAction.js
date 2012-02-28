
var Action = require("./Action");
var util = require("util");
var querystring = require("querystring");
var fs = require("fs");

function CallbackAction(){

}

util.inherits( CallbackAction, Action );

/**
* @Override
*/
CallbackAction.prototype.execute = function(){
    var response = this.getResponse();
	var email = this.getParams()["openid.ax.value.email"] || this.getParams()["openid.ext1.value.attr0"];
//	console.log( this.getParams() );
	if( email )
	this.setCookie( "email", email );
    response.writeHead(200, {'Content-Type': 'text/html'});
	var html = fs.readFileSync(this.getRealPath() + "template/callback.html", "utf8");
	response.write(html);
	response.write("<script> window.google.identitytoolkit.notifyFederatedSuccess({\"email\":\""+email+"\", \"registered\": true}); </script>");
    response.end("");
};

module.exports = CallbackAction;


