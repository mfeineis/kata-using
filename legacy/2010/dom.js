'use strict';
using(function(){
	this.extension('DOM', function(base){
		//console.info(base);
		
		//request('debug').warn('[ok]: accessing debug.warn from an extension');
		
		return base.DOM;
	});
});