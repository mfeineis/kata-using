//var debug = require('debug');
//var math = require('math');

//alert(require('math').add(1,2,3));

var str = '';

str += 'require is function ' + (typeof require === 'function');
str += '\nexports is object ' + (typeof exports === 'object');

//alert(str);

this.module('blubb', function(){
	return function() { alert(str); }
}, window);