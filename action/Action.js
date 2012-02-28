
var formParser = require("../libs/formParser");

function Action(){

}

Action.prototype.execute = function(){

};

Action.prototype.getRequest = function(){
	return this.request_;
};

Action.prototype.getResponse = function(){
	return this.response_;
};

Action.prototype.init = function( request, response, path, callback ){
	var _this = this;
	this.request_ = request;
	this.response_ = response;
	this.realPath_ = path;
	formParser.getParams( request, function( params ){
		_this.params_ = params;
		callback();
	});
};

Action.prototype.getParams = function(){
	return this.params_;
};

Action.prototype.getRealPath = function(){
	return this.realPath_;
};

Action.prototype.setCookie = function( key, value ){
	this.getResponse().setHeader('Set-Cookie',key + "=" + value);
};

Action.prototype.getCookie = function( key ){
	if( this.cookies_ === undefined ){
		var cookies = {};
		console.log(this.getRequest().headers.cookie);
		if( this.getRequest().headers.cookie != undefined ){
			var cookieStrs = this.getRequest().headers.cookie.split(";");
			for( var i in cookieStrs ){
				var cookie =  cookieStrs[i].split("=");
				cookies[ cookie[0].replace(/^ {0,}/g,"") ] = cookie[1];
			}
		}
		this.cookies_ = cookies;
	}
	return this.cookies_[ key ];
};

module.exports = Action;
