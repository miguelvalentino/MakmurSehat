// /controller/updateMenuItemController.js
angular.module('makmurSehat', [])
  .controller('updateMenuItemController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    const itemId = $location.search().id;

    // Fetch the menu item to be updated
    function fetchMenuItem() {
      $http.get(`http://localhost:5000/api/menu/${itemId}`)
        .then(function(response) {
          console.log('Menu item data:', response.data);
          $scope.menuItem = response.data; // populate the form with the current item data
        })
        .catch(function(error) {
          console.error('Error fetching menu item:', error);
        });
    }

    fetchMenuItem();

    // Update the menu item
    $scope.updateMenuItem = function() {
      if (!$scope.menuItem.name || !$scope.menuItem.description || !$scope.menuItem.price || !$scope.menuItem.image) {
        alert('All fields are required!');
        return;
      }

      const updatedMenuItem = {
        name: $scope.menuItem.name,
        description: $scope.menuItem.description,
        price: $scope.menuItem.price,
        image: $scope.menuItem.image
      };

      $http.put(`http://localhost:5000/api/menu/${itemId}`, updatedMenuItem)
        .then(function(response) {
          alert('Menu item updated successfully!');
          $window.location.href = 'menu.html'; // redirect back to menu list
        })
        .catch(function(error) {
          console.error('Error updating menu item:', error);
          alert('Failed to update menu item!');
        });
    };
  }]);
