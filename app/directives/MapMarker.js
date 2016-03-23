
module.exports = function($compile) {
	return {
		//templateUrl:'../views/MapMarker.html',
		scope: {
			place:'=',
			index: '@',
			map: '=',
			dist: '='
		},
		restrict: 'E',
		link: function($scope, $element, $attrs) {

			var markerSpecs = {
			    position: $scope.place.geometry.location,
			    map: $scope.map,
			    icon:  {
			    	url: '../images/pin2.png',
			    	//size: new google.maps.Size(30, 45),
			    },
			    label: {
			    	text: ($scope.index),
			    	color: 'white',
			    }
			}


			var marker = new google.maps.Marker(markerSpecs);

			var content = "<div><ng-include src=\"'" + '../views/PlaceDetailInfoBox.html' + "'\"></ng-include><div>";
			var compiled = $compile(content);
			var compiledContent = compiled($scope);
			
			var infoWindow = new google.maps.InfoWindow();

			marker.addListener('mouseover', function() {
				infoWindow.setContent(compiledContent[0].innerHTML);						
				infoWindow.open($scope.map, marker);
			});

			marker.addListener('mouseout', function() {
				infoWindow.close();
			});

			$scope.$on('$destroy', function() {
	        	marker.setMap(null);		      	
	        });


				
		}
	}
}