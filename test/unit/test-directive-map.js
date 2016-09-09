describe("test-directive-map", function () {
 	var mapLeaflet;

	beforeEach(module('leaflet-angular'));

	 beforeEach(inject(function(_$compile_, _$rootScope_){
    	var $compile = _$compile_;
    	var scope = _$rootScope_.$new();
		var element = $compile(angular.element("<leaflet-map id='map'></leaflet-map>"))(scope);
	
	    var controller = element.controller('leafletMap');
	    controller.getMap().then(function(map){
	    	mapLeaflet = map;
		});
		scope.$digest();
  	}));

	it('test config default', function() {
		expect(mapLeaflet.getMinZoom()).toEqual(2);
		expect(mapLeaflet.getZoom()).toEqual(1);
	    expect(mapLeaflet.getCenter().lat).toEqual(0);
	    expect(mapLeaflet.getCenter().lng).toEqual(0);
	});
});