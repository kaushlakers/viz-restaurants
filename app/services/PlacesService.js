
module.exports = function($rootScope) {

    var placesService;
    var distService;
    var places;
    var distances;
    var origin;
    var map = {
        center: {latitude: 37.1, longitude : -95.7},
        zoom: 8,
        control: {}
    };

    /**
     * @param  {array} distResults list of DistanceObjects
     * @param  {object} status of distance matrix request
     *
     * @description Fires an event once all the distance values have been received
     * Event caught in controller
     */
    function fireUpdateEvent(distResults, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            //updateDistances(results, status);
            distances = distResults.rows[0].elements;
            distances = distances.map(function(obj) {
                return obj.distance;
            })
            $rootScope.$broadcast('places.change', places, distances);
        }       
    };

    /**
     * @param  {array} placesResults results from google places API
     * @param  {object} status of google places request
     *
     * Callback to receive google place results and send Distance matrix request
     */
    function updateDistances(placesResults, status) {
        places = placesResults;
        var dests = []
        for (var i = 0; i < placesResults.length; i++) {
            dests.push(placesResults[i].geometry.location);
        }
        distService.getDistanceMatrix({
            origins: [origin],
            destinations: dests,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }, fireUpdateEvent)  //chaining this to fire the update event to controller
    }

    return {

        /**
         * @param  {google.maps.LatLng} newLatLng The new center to find places from
         *
         * @description Called from the view when new location is selected. Sends new
         * google place request
         */
        updatePlaces: function(newLatLng) {

            if (placesService) {

                origin = newLatLng;
                var request = { 
                    location: newLatLng,
                    radius: '3000',
                    types: ['restaurant']
                };

                placesService.nearbySearch(request, updateDistances); //chaining places request with distance requests
            }
        },

        /**
         * @param  {string} id place id of a google place 
         * @param  {Function} callback function to handle PlaceDetailResponse
         *
         * @description Gets a place detail object based on a place id.
         */
        getPlaceDetail: function(id, callback) {
            var request = {placeId: id};
            placesService.getDetails(request, callback);
        },

        initializeService: function(placesObj) {
            placesService = placesObj;
            distService = new google.maps.DistanceMatrixService();   
        }

        

    }
}