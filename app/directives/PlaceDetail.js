
module.exports = function() {
	return {
		templateUrl:'../views/PlaceDetail.html',
		scope: {
			place:'=',
			index:'@',
			dist:'='
		},
		restrict: 'E',
		replace: true,
		link: function($scope, $element, $attrs) {
			

			$scope.getImageUrl = function() {
				if ($scope.place.photos) {
					return $scope.place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150});
				} else {
					return $scope.place.icon;
				}
			}

			$scope.getFormattedAddress = function(address) {
				return address.split(',')[0];
			}
		}
	}
}