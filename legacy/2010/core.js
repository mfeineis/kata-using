'use strict';

(function(){

var InnerCore = null;
var Core = (function(window, undefined){

	function Sandbox() { }
	var _sandbox = new Sandbox();
	
	function Base() { }
	
	//function Export() { }
	//Base.instances = { };
	/**
	 * 
	 */
	//console.info('Core executed');
	
	var debug = true;
	var scriptTagType = 'text/javascript';
	var sep = '|';
	
	var exports = { };
	
	window.sandbox = new Sandbox();

	function extend(objId, name, ext, context){

		var params = [];
		var extContext = {};

		if (objId === 'base'){
			context = Base.prototype;
			//params.push(Object.create(Base).prototype);
			params.push(new Base());
			
		} else if (objId === 'core'){
			context = Sandbox.prototype;
			//params.push(Object.create(Base).prototype);
			params.push(new Base());
			extContext = context;
			
		} else if (objId === 'module'){
			if (typeof name === 'function'){
				if (context === undefined){
					ext = name;
					name = 'blubb';
				}
				else {
					name = name();	
				}
			}

			context = context || {};
			//console.info(context);
			if (context === Base.prototype || context === Sandbox.prototype){
				throw new Error('Access violation! Modules must not extend the core or base objects');
			}
			params.push(new Sandbox());
			extContext = this;
		} else {
			throw Exception('Error in extension constructor');
		}

		if (name !== undefined){

			if (typeof ext === 'function'){

				if (context[name] === undefined){
					context[name] = (ext).apply(extContext, params);
					
					//Modules[objId + '.'  + name] = ext;
				} else {
					throw new Error('Object ' + name + ' already exists in this context');
				}
			} else {
				throw new Error('Object has to be of type "function"');
			}
		}
	}

	function load(libraryName, callback){
		
		if (includes[libraryName] === undefined){
			
			//console.info('Loading ' + libraryName);
			var callbackParams = generateNewCallbackParams(libraryName);
			var uri = corePath + libraryName + '.js';
			
			if (typeof callback !== 'function'){
				callback = function(){ };
			}

			
			
			var AJAX = null;
			if (window.XMLHttpRequest) {
			    AJAX = new XMLHttpRequest();
			} else {
			    AJAX = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (AJAX == null) {
			    return false;
			} else {
				AJAX.onreadystatechange = function () {
					if (AJAX.readyState === 4) {
						var status = AJAX.status;
						var xml = AJAX.responseXML;
						
						// If loading is ok we evaluate the new code
						if (status === 200){
							queue(libraryName, AJAX.responseText, callback);
						}
						delete AJAX;
					}
				}
				//var timestamp = new Date();
				//var uri = url + '?' + '&timestamp=' + (timestamp * 1);
				//var uri = url;
				AJAX.open("GET", uri, true);
				AJAX.send(null);
				return true;
			}
		}
	}
	
	function queue(libraryName, code, callback){
		//var code = elem.text;
		
		
		//console.info(code);
		
		var script = document.createElement('script');
		script.type = scriptTagType;
		//script.src = '';
		
		
		code = transformCode(code);
		
		//alert(code);
		script.text = code;
		
		//alert(exports[libraryName].add);
		
		//eval(code);
		
		var head = document.getElementsByTagName("head")[0] || document.documentElement;
		head.insertBefore(script, head.firstChild);
		
		//var elem = document.getElementById(script.id);
		//queue(elem);
		
		
		
		includes[libraryName] = script;
		
		//alert(script.text);
		//eval(script.text);
		
		callback();
	}
	
	function transformCode(code){
	
		code.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
		
		
		code = '\'use strict\'; using(function(sandbox, require, exports)\{' + 
			code +
			'\});';
		
		return code;
	}
	
	function using(libraries, callback) {
		
		if (typeof libraries === 'function' && callback === undefined){
			callback = libraries;
			libraries = '';
		}
		
		var extendedCallback = function(){
			
			return (function (args){
			
				var context;

				//if (libraries === ':base'){
				if (libraries === ':base'){
					context = priv;
					callback.apply(context, []);
				} else {
					context = publ;
					callback.apply(context, args);
				}
			})(arguments);
		};
		
		var libs = extractNotLoaded(libraries);
		var length = libs.length;		
		
		if (length > 0){
			var i = 1;
			for (var libId in libs){
				var curLib = libs[libId];
				
				if (i !== length){
					load(curLib);
				} else {
					load(curLib, extendedCallback);
				}
				i++;
			}
		} else {
			if (typeof callback === 'function'){
				extendedCallback.apply(this, generateNewCallbackParams(libraries));
			}
		}
	}
	
	function Request(){  
	//Request.prototype.doRequest = function(){
	
		//console.info(arguments);
		//return function(){
		
		//var sandbox = new Sandbox();
		//var that = this;
			
			
			//var context = arguments.callee.context;
			
		
		return this.doRequest;
		//}
	}
	Request.prototype.doRequest = function doRequest(){
				
		//if (arguments.length === 0){
		//	args = Request.prototype.recentRequest;
		//}
		
		var name = arguments[0];
		var obj = _sandbox[name];
		
		//console.info(name);
		//console.info(obj);
		
		var that = Request.prototype;
		
		if (obj === undefined){
			load(name);
		}
		
		if (obj === undefined && that.currentRequests < that.maxRequests){
			//that.recentRequest = ;
			//that.currentRequests++;
			
			obj = function(){
				//arguments.callee(arguments);
				//Request.prototype.doRequest(arguments);
				//return doRequest(arguments);
				return {};
			}
			//_sandbox.debug.info('Request \'' + name + '\' could not be fulfilled.');
			//throw new Error('Given up on ' + name);
			
			//return that.chainy.call(requestAnonymous, arguments[0]);
		} else {
			//that.currentRequests = 0;
		}
		
		//var args1 = Array.prototype.shift.call(this, args);
		//obj[args[1]].apply({}, [args[3]]);
		//console.info.apply(context, args);
		//console.info(context);
		
		return obj;
	};
			/*{
		recentRequest: null,
		,
			
		chainy: function chainy(){
			
			var that = Request.prototype;
			that.currentRequests++;
			return that.doRequest(arguments[0]);
		},
		maxRequests: 100,
		currentRequests: 0
	};*/
	
	function extractNotLoaded(libraries){
	
		if (typeof libraries === 'array'){
			libraries = libraries.join(sep);
		}
	
		libraries = libraries.replace(/\s/g, '');
		//console.info('requested: ' + libraries);
		
		libraries = libraries.replace(/^(\s)*\:(.)*(\s)*$/, '');
		
		if (libraries === ''){
			return [];
		}
		
		var requestedLibs = libraries.split(sep);
		var newlibs = [];

		for (var libId in requestedLibs){
			var curLib = requestedLibs[libId];
			/*curLib.trim();*/
			
			if (curLib !== ''){
			
				if (includes[curLib] === undefined){
					newlibs.push(curLib);
				}
			}
		}
		
		return newlibs;
	}
	
	function generateNewCallbackParams(libraryName){
		//return [publ, new Sandbox()];
		//return [publ, Object.create(Sandbox).prototype];
		//var sandb = Object.create(Sandbox).prototype;
		//var sandb = new Sandbox();
		//var request = new Request();
		//request.context = sandb;
		//var request = new Request();
		
		//if (exports[libraryName] === undefined){
			exports[libraryName] = {};
			
			//return [new Sandbox(), request];
			return [new Sandbox(), new Request(), exports[libraryName]];
		//}
	}
	
	var priv = InnerCore = {
		base: function(name, obj){ 
			extend('base', name, obj); 
		},
		extension: function(name, obj){
			extend('core', name, obj);
		},
		module: function(name, obj, context){
			extend('module', name, obj, context);
		},
		nobase: function(){ },
		noextension: function(){ },
		nomodule: function(){ }
	}
	
	var publ = {
		//base: priv.base,
		extension: priv.extension, 
		module: priv.module,
		nobase: priv.nobase,
		noextension: priv.noextension,
		nomodule: priv.nomodule
	};
	
	var includes = { };
	var corejs = /core\.js(\?.*)?$/;
	
	var scriptTags = document.getElementsByTagName('script');	
	var libScriptTag = undefined;

	for (var tag in scriptTags){
		tag = scriptTags[tag];
		
		if (tag.src){
			if (tag.src.match(corejs)){
				libScriptTag = tag;
				break;
			}
		}
	}
	
	var corePath = libScriptTag.src.replace(corejs, '');
	
	var loadQuery = libScriptTag.src.match(/\?.*load=([a-z|]*)/);
	var libsStr = '';
	libsStr += /*sep + */(loadQuery ? loadQuery[1] : '');
	
	var libsToLoad = extractNotLoaded(libsStr);

	for (var libName in libsToLoad){

		load(libsToLoad[libName]);
	}


	//var callbackParams = [publ, new Sandbox()];	
	window['using'] = using;
	
	if (debug === true){
		window['notusing'] = function(){ };
	}

	//return publ;
})(window);

/**
 * Basic functionality
 */
//using(':base', function(){ 
with (InnerCore){

	nobase('expose', function(){	
		
		
		var me = Core;/*{
			base: base,
			module: module,
			nomodule: base.nop,
			extension: extension,
			require: require
		};*/
		
		var aliases = ['Core'];

		for (var name in aliases){
			window[aliases[name]] = me;
		}
		
	});

	base('nop', function(base){
		return function() { };
	});

	extension('nop', function(base){
		return base.nop;
	});

	base('debug', function(base){

		var debugging = true;

		function error(msg){
			if (typeof console === 'object'){
				console.error(msg);
			} else {
				alert(msg);
			}
		}

		function info(msg){
			if (typeof console === 'object'){
				console.info(msg);
				//console.info.apply(msg, arguments);
			} else {
				alert(msg);
			}
		}
		
		function warn(msg){
			
			if (typeof console === 'object'){
				console.warn(msg);
				//console.warn('context = {');
				//console.warn(this);
				//console.warn('}');
			} else {
				alert(msg);
			}
			
		}
		
		function log(msg){
			if (typeof console === 'object'){
				console.log(msg);
			} else {
				alert(msg);
			}
		}

		if (debugging === true){
			return {
				error: error,
				info: info,//base.nop,//
				warn: warn,
				log: log
			};
		} else {
			return {
				error: base.nop,
				info: base.nop,
				warn: base.nop,
				log: base.nop
			}
		}
	});

	extension('debug', function(base){
		return base.debug;
	});
	
	base('DOM', function(base){
		
		//request('debug', 'warn', '[forbidden]: accessing debug.warn from the base');
		
		var func = function(elem){
		
			if (arguments.length === 1){
				return document.getElementById(elem);
			} else {
				base.debug.log('[EE](base.DOM): Couldn\'t deliver requested element \'' + elem + '\'');
			}
		};
		
		func.pageTitle = function pageTitle(title){
			
			if (arguments.length === 1){
				document.title = title;
			} else {
				return document.title;
			}
		}
		
		return func;
	});
	
	/*extension('newDebug', function(base){
		
		return function(requested){
		
			if (typeof requested === 'string'){
			
				return base.debug[requested];
			}
		}
	});*/

}

})();
