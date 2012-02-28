
var Action = require("./Action");
var util = require("util");
var querystring = require("querystring");
var fs = require("fs");

function IndexAction(){

}

util.inherits( IndexAction, Action );

/**
* @Override
*/
IndexAction.prototype.execute = function(){
	console.log(querystring.parse(this.getRequest().url.replace(/^.+\?/,"")));
	var response = this.getResponse();
	response.writeHead(200, {'Content-Type': 'text/html'});
	var html = fs.readFileSync(this.getRealPath() + "template/index.html", "utf8");
	response.write(html);
	if(this.getCookie("email")){
		response.write("<script>setTimeout(function(){window.google.identitytoolkit.showSavedAccount(\""+this.getCookie("email")+"\");},100);</script>");
	}
	response.end("");
};

module.exports = IndexAction;
