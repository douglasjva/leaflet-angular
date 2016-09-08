angular.module('leaflet-angular')
.directive('leafletMap', leafletMap);

leafletMap.$inject = ['$q'];

function leafletMap($q) {

	var deferred = $q.defer();
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			id: '@',
			center: '=',
			tileLayer: '='
		},
		controller: function() {
			var vm = this;

			vm.drawMarker = function(marker) {
				deferred.promise.then(function(map){
					map.addLayer(marker);
				});
			}		

			vm.drawPolyline = function(polyline) {
				deferred.promise.then(function(map){
					map.addLayer(polyline);
					map.fitBounds(polyline.getBounds());
				});
			}

		},
		controllerAs: 'leafletMap',
		template: '<div><div ng-transclude></div></div>',
		link: function(scope, element, attrs, ctrl) {
			var map = new L.Map(element[0], {
				center: [scope.center.lat, scope.center.lng],
				zoom: scope.center.zoom,
				layers: [
					L.tileLayer(scope.tileLayer.urlTemplate, scope.tileLayer.options)
				]
			});
			deferred.resolve(map);
		}
	};

};