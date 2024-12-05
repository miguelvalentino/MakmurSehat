angular.module('makmurSehat', [])
  .controller('menuController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.menuItems = [];
    $scope.searchQuery = '';
    $scope.minPrice = null;
    $scope.maxPrice = null;
    $scope.sortOrder = 'asc'; // 'asc' untuk ascending, 'desc' untuk descending

    // Fetch all menu items
    function fetchMenuItems() {
      $http.get('http://localhost:5000/api/menu')
        .then(function(response) {
          $scope.menuItems = response.data;
        })
        .catch(function(error) {
          console.error('Error fetching menu items:', error);
        });
    }

    $scope.editMenuItem = function(id) {
      $window.location.href = 'updatemenu.html?id=' + id;
    };

    $scope.deleteMenuItem = function(id) {
      $http.delete('http://localhost:5000/api/menu/' + id)
        .then(function() {
          fetchMenuItems();
        })
        .catch(function(error) {
          console.error('Error deleting menu item:', error);
        });
    };

    // Function to filter menu items based on search query and price range
    $scope.filterMenuItems = function() {
      return $scope.menuItems.filter(function(item) {
        const matchesSearch = item.name.toLowerCase().includes($scope.searchQuery.toLowerCase());
        const matchesMinPrice = $scope.minPrice === null || item.price >= $scope.minPrice;
        const matchesMaxPrice = $scope.maxPrice === null || item.price <= $scope.maxPrice;
        return matchesSearch && matchesMinPrice && matchesMaxPrice;
      });
    };

    // Function to sort menu items by price
    $scope.sortMenuItems = function() {
      return $scope.filterMenuItems().sort(function(a, b) {
        return $scope.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    };

    fetchMenuItems();
  }]);