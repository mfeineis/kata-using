'use strict';


/**
 * Basic functionality
 */
using(':base', function(){ with (this){

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

});