angular.module('makmurSehat')
  .controller('addMenuController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.addMenuItem = function() {
      const newItem = {
        name: $scope.name,
        description: $scope.description,
        price: $scope.price,
        image: $scope.image
      };

      $http.post('http://localhost:5000/api/menu', newItem)
        .then(function() {
          $window.location.href = 'menumakanan.html';
        })
        .catch(function(error) {
          console.error('Error adding menu item:', error);
        });
    };
  }]);