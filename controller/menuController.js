// /controller/menuController.js
angular.module('makmurSehat', [])
  .controller('menuController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    // Fetch all menu items
    function fetchMenuItems() {
      $http.get('http://localhost:5000/api/menu')
        .then(function(response) {
          console.log('Menu items:', response.data);
          $scope.menuItems = response.data; // populate menu items
        })
        .catch(function(error) {
          console.error('Error fetching menu items:', error);
        });
    }

    fetchMenuItems();

    // Add a new menu item
    $scope.addMenuItem = function() {
      if (!$scope.name || !$scope.description || !$scope.price || !$scope.image) {
        alert('All fields are required!');
        return;
      }

      const menuItemData = {
        name: $scope.name,
        description: $scope.description,
        price: $scope.price,
        image: $scope.image
      };

      $http.post('http://localhost:5000/api/menu', menuItemData)
        .then(function(response) {
          alert('Menu item added successfully!');
          fetchMenuItems(); // reload the menu items list
        })
        .catch(function(error) {
          console.error('Error adding menu item:', error);
          alert('Failed to add menu item!');
        });
    };

    // Edit a menu item
    $scope.editMenuItem = function(itemId) {
      $window.location.href = `updateMenuItem.html?id=${itemId}`;
    };

    // Delete a menu item
    $scope.deleteMenuItem = function(itemId) {
      if (confirm('Are you sure you want to delete this menu item?')) {
        $http.delete(`http://localhost:5000/api/menu/${itemId}`)
          .then(function(response) {
            alert('Menu item deleted!');
            fetchMenuItems(); // reload menu list after deletion
          })
          .catch(function(error) {
            console.error('Error deleting menu item:', error);
            alert('Failed to delete menu item!');
          });
      }
    };
  }]);
