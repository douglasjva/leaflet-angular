angular.module('leaflet-angular')
.constant('DefaultConstants', function DefaultConstants(){
	var constants = {};
	constants.urlTemplate = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	constants.options = {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'};
    constants.minZoom = 2;
    constants.zoom = 3
    constants.center = {lat: 0, lng:0};
    return constants;
}());