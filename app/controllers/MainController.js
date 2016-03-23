
module.exports = function($scope, uiGmapGoogleMapApi, uiGmapIsReady, Utils, PlacesService) {
    
    uiGmapGoogleMapApi.then(initDefault);

    uiGmapIsReady.promise().then(init);
    

    
    /**
     * @param  {Event} event
     *
     * @description initialize map with default values when map just loads
     */
    function initDefault(event) {
        
        $scope.map = {
            center: {latitude: 37.1, longitude : -95.7},
            zoom: 8,
            control: {}
        };

        $scope.sort = {
            options:[
            {name:"Distance", value:"dist"}, 
            {name:"Price", value:"price_level"}, 
            {name:"Rating", value:"rating"}]
        }
        $scope.sort.selected = $scope.sort.options[2];    

        $scope.places = [];
        $scope.placesDetails = [];
        $scope.markerOptions = {icon: "../images/pin.jpeg"}
    }

    
    /**
     * @param {Array} maps To access the map object
     *
     * @description Initializations after map is completely ready
     */
    function init(maps) {
        places = new google.maps.places.PlacesService(maps[0].map);
        //initialize service with map object
        PlacesService.initializeService(places);        
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                var coords = pos.coords;
                $scope.map.center = {latitude: coords.latitude, longitude : coords.longitude};
                var latLng = new google.maps.LatLng({lat: coords.latitude, lng: coords.longitude});
                PlacesService.updatePlaces(latLng);
            });
        }
    }


    $scope.sortData = function(option) {
        $scope.sort.selected = option;

         var placesDetails = []
        //pins don't update unless object is deep copied
        angular.copy($scope.placesDetails, placesDetails);
        
        if (option.value !== "dist") {
            
            $scope.placesDetails = _.orderBy(placesDetails, option.value);
        }
        else {
            var sortedLists = Utils.simultSort($scope.distances, placesDetails, "value");
            
            $scope.distances = sortedLists[0];
            $scope.placesDetails = sortedLists[1];
        }
    }

    /**
     * @param  {Event} event 
     * @param {Array} places Array of GooglePlaces Objects
     * @param  {Array} distances Array of DistanceMatrix objects
     * 
     * @description Event handler for places change event. This event is fired by PlacesService
     * when new data is received
     */
    $scope.$on('places.change', function(event, places, distances) {
        
        $scope.distances = distances;
        
        $scope.placesDetails = [];
        //console.log(results);
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
            
            var place = places[i];
            bounds.extend(places[i].geometry.location);

            PlacesService.getPlaceDetail(places[i].place_id, function(placeDetail, status) {

                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    $scope.placesDetails.push(placeDetail);
                }
            });

        }  
        $scope.map.control.getGMap().fitBounds(bounds);
                
    });

}