module.exports = function(PlacesService, isMapReady) {
    return {
        templateUrl:'../views/AutoCompleteSearch.html',
        restrict: 'E',
        replace: true,
        link: function($scope, $element, $attrs) {
            var autoComplete;
            isMapReady.promise().then(init)
            
            function init(maps) {
                autoComplete = new google.maps.places.Autocomplete(document.getElementById("loc-search-bar"), {types: ['(cities)']});
                autoComplete.addListener('place_changed', placeChanged);

            }

            function placeChanged() {
                var place = autoComplete.getPlace();
                if (place.geometry) {
                    PlacesService.updatePlaces(place.geometry.location);
                }
            }
        }
    }
}