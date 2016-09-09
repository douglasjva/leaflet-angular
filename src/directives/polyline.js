(function() {
	angular.module('leaflet-angular')
	.directive('polylineLeaflet', polylineLeaflet);

	polylineLeaflet.$inject = [];

	function polylineLeaflet() {
		return {
			restrict: 'E',
			scope: {
				latlngs: '=',
				contentPopup: '=',
				options: '='
			},
			require: '^leafletMap',
			link: function(scope, element, attrs, ctrl) {

		        var polyline = new L.Polyline(convertLatLngs(scope.latlngs), scope.options);
		        if(scope.contentPopup) {
					polyline.bindPopup(scope.contentPopup);
				}

				scope.$on('$destroy', function() {
					polyline.remove();
			    });

			    scope.$watch('latlngs', function(newValue, oldValue) {
			    	if(!angular.equals(newValue, oldValue)) {
			    		polyline.setLatLngs(newValue);
			    	}
				}, true);

				ctrl.drawPolyline(polyline);
			}
		};


		function convertLatLngs(latlngs){
			var resultLatLngs = [];
			for (i = 0; i < latlngs.length; i++) { 
				var inter = latlngs[i];
				resultLatLngs[i] = new L.LatLng(inter.lat, inter.lng);
			}
			return resultLatLngs;
		}
	};
})();