'use strict';

angular.module('biomesApp')
	.directive('testVis', function() {
		return {
			template: "<p> Hello there! <p>"
		};
	})

	.directive('biomeDirective', function() {
		return {
    		templateUrl: 'html/biome.html'
  		};
	});

