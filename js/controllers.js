'use strict';

//
angular.module('biomesApp')
	.controller('mainCtrl', [ '$scope', '$interval', function($scope, $interval) {

		$scope.Definitions = {
			Resources: {
				Ant: {
					name: "Ant"
				},
				AntQueen: {
					name: "Ant Queen",
					production: {
						type: "Ant",
						rate: 0.1
					}
				},
				Eagle: {
					name: "Eagle"
				},
				Rabbit: {
					name: "Rabbit",
					production: [
						{ 
							target: "Rabbit",
						 	tick: function(me, target) { return (me.count / 2) * 0.01; }
						}
					]
				}
			},
			Biomes: {
				Underground: {
					name: "Underground",
					style_class: "panel-underground",
					resources: [ "Ant", "AntQueen" ]
				},
				Air: {
					name: "Air",
					style_class: "panel-air",
					resources: [ "Eagle" ]
				},
				Meadow: {
					name: "Meadow",
					style_class: "panel-meadow",
					resources: [ "Rabbit" ]
				}
			}
		};


		$scope.Resource = function(definition, biome) {
			this.definition = definition
			this.name = definition.name;

			this.biome = biome;
			this.count = 0;

			this.tick = function() {
				//var rate = this.definition.production && this.definition.production.rate || 1;
				//this.count = this.count + rate;
			}
		};

		$scope.Biome = function(definition) {
			this.definition = definition
			this.name = definition.name;
			this.resources = definition.resources.map(x => new $scope.Resource($scope.Definitions.Resources[ x ], this))

			this.tick = function() {
				for (let res of Object.keys(this.resources))
					this.resources[ res ].tick()
			}
		};

		$scope.WorldClass = function() {
			this.biomes = { 
				Air: new $scope.Biome($scope.Definitions.Biomes.Air),
				Meadow: new $scope.Biome($scope.Definitions.Biomes.Meadow),
				Underground: new $scope.Biome($scope.Definitions.Biomes.Underground)
			};

//			this.resources = Object.keys(this.biomes).map(key => this.biomes[ key ].resources)
//			this.resources = [].concat.apply([], this.resources)
		}

		$scope.World = new $scope.WorldClass();

		$interval(function() {
            for (let biome of Object.keys($scope.World.biomes)) {
				$scope.World.biomes[ biome ].tick()
			}
        }, 100)

		// click handlers
		$scope.increment = function(resource) {
			//console.log(resource)
			resource.count = resource.count + 1
		};

}]);


