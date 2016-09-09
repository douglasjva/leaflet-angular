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
				tileLayer: '=',
				optionsMap: '=',
				controlOptions: '='
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
						vm.fitBoundsLayer(polyline);
					});
				};

				vm.fitBoundsLayer = function(layer) {
					vm.getMap().then(function(map){
						map.fitBounds(layer.getBounds());
					});
				}

			},
			controllerAs: 'leafletMap',
			template: '<div><div ng-transclude></div></div>',
			link: function(scope, element, attrs, ctrl) {
				var centerMap = L.latLng(dc.center.lat, dc.center.lng), minZoom = dc.minZoom,
				zoom = dc.zoom, zoomControl = dc.zoomControl;
				var urlTemplate = dc.urlTemplate, options = dc.options;
				var controlOptions = {position: dc.posControlZoom};

				if(scope.tileLayer && scope.tileLayer.urlTemplate) {
					urlTemplate = scope.tileLayer.urlTemplate;
					options = scope.tileLayer.options;
				}

				var optionsMap = scope.optionsMap;
				if(optionsMap && optionsMap.center && optionsMap.center.lat && optionsMap.center.lng)
					centerMap = L.latLng(optionsMap.center.lat, optionsMap.center.lng);
				
				if(optionsMap && optionsMap.zoomControl === true)
					zoomControl = true;

				if(optionsMap && optionsMap.zoom)
					zoom = optionsMap.zoom;

				if(optionsMap && optionsMap.minZoom)
					minZoom = optionsMap.minZoom;

				if(scope.controlOptions && scope.controlOptions.position)
					controlOptions.position = scope.controlOptions.position;

				var map = new L.Map(element[0], {
					center: centerMap,
					zoomControl: zoomControl,
					minZoom: minZoom,
					zoom: zoom,
					layers: [
						L.tileLayer(urlTemplate, options)
					]
				});

				//config control zoom
				L.control.zoom(controlOptions).addTo(map);

				ctrl.initMap(map);
			}
		};
	};
})();