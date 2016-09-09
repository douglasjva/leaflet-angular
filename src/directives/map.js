(function() {
	angular.module('leaflet-angular')
	.directive('leafletMap', leafletMap);

	leafletMap.$inject = ['$q', 'DefaultConstants'];

	function leafletMap($q, dc) {

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
				deferred = $q.defer();

				vm.getMap = function() {
					return deferred.promise;
				};

				vm.initMap = function(map) {
					deferred.resolve(map);
				};

				vm.drawMarker = function(marker) {
					vm.getMap().then(function(map){
						map.addLayer(marker);
					});
				};		

				vm.drawPolyline = function(polyline) {
					vm.getMap().then(function(map){
						map.addLayer(polyline);
						map.fitBounds(polyline.getBounds());
					});
				};

			},
			controllerAs: 'leafletMap',
			template: '<div><div ng-transclude></div></div>',
			link: function(scope, element, attrs, ctrl) {
				var centerMap = L.latLng(dc.center.lat, dc.center.lng), minZoom = dc.minZoom, zoom = dc.zoom;
				var urlTemplate = dc.urlTemplate, options = dc.options;

				if(scope.tileLayer && scope.tileLayer.urlTemplate) {
					urlTemplate = scope.tileLayer.urlTemplate;
					options = scope.tileLayer.options;
				}

				if(scope.center && scope.center.lat && scope.center.lng)
					centerMap = L.latLng(scope.center.lat, scope.center.lng);
				
				if(scope.center && scope.center.zoom)
					zoom = scope.center.zoom;

				if(scope.center && scope.center.minZoom)
					minZoom = scope.center.minZoom


				var map = new L.Map(element[0], {
					center: centerMap,
					minZoom: minZoom,
					zoom: zoom,
					layers: [
						L.tileLayer(urlTemplate, options)
					]
				});
				ctrl.initMap(map);
			}
		};
	};
})();