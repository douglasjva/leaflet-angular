angular.module('leaflet-angular')
.directive('markerLeaflet', markerLeaflet);

markerLeaflet.$inject = [];

function markerLeaflet() {
	return {
		restrict: 'E',
		scope: {
			latlng: '=',
			contentPopup: '=',
			options: '=',
			events: '='
		},
		require: '^leafletMap',
		link: function(scope, element, attrs, ctrl) { 

			var marker = L.marker([scope.latlng.lat, scope.latlng.lng], scope.options);
			
			if(scope.contentPopup) {
				marker.bindPopup(scope.contentPopup);
			}
			
			if(scope.options.draggable) {
				if(scope.events.dragstart) {
					marker.on('dragstart', function(event) {
						refreshLatLng(event.target.getLatLng());
						scope.events.dragstart(event);
					});
				}
				if(scope.events.drag) {
					marker.on('drag', function(event) {
						refreshLatLng(event.target.getLatLng());
						scope.events.drag(event);
					});
				}
				if(scope.events.dragend) {
					marker.on('dragend', function(event) {
						refreshLatLng(event.target.getLatLng());
						scope.events.dragend(event);
					});
				}
			}

			scope.$on('$destroy', function() {
				marker.remove();
		    });

		    scope.$watch('latlng', function(newValue, oldValue) {
		    	if(!angular.equals(newValue, oldValue) && !angular.equals(marker.getLatLng(), newValue)) {
		    		marker.setLatLng([newValue.lat, newValue.lng]);
		    	}
			});

			ctrl.drawMarker(marker);

			function refreshLatLng(latLng) {
				scope.$apply(function() {
					scope.latlng = latLng;
				});
			}
		}
	};
};