module.exports = function starRating() {
    return {
      restrict: 'E',
      templateUrl: '../views/Rating.html',
      scope: {
        ratingValue: '=',
        max: '=?', 
        onRatingSelect: '&?',
        iconClass: '@'
    },
		link: function($scope, $element, $attributes) {
			if ($scope.max == undefined) {
			  $scope.max = 5;
			}
			$scope.stars = [];

			for (var i = 0; i < $scope.max; i++) {
			    $scope.stars.push({
			        filled: i < $scope.ratingValue
			    });
			}
			$scope.getClass = function(star) {
				var obj = {filled: star.filled}
				obj[$scope.iconClass.split('-')[1]] = true;
				return obj;
			}
		}	
    };
  }