'use strict';

angular.module('biomesApp')
	.filter('countFormat', function() {
    return function(x) {
		//return Math.round(x * 100) / 100;
		return x.toLocaleString()
	};
});
