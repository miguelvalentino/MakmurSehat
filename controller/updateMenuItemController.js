angular.module('makmurSehat')
  .controller('updateMenuItemController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // Ambil id dari URL

    if (!id) {
      console.error('ID tidak ditemukan dalam URL');
      $window.location.href = 'menumakanan.html'; // Redirect jika id tidak ada
      return;
    }

    // Fetch the menu item to be updated
    $http.get('http://localhost:5000/api/menu/' + id)
      .then(function(response) {
        $scope.menuItem = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching menu item:', error);
      });

    // Update the menu item
    $scope.updateMenuItem = function() {
      $http.put('http://localhost:5000/api/menu/' + id, $scope.menuItem)
        .then(function() {
          $window.location.href = 'menumakanan.html';
        })
        .catch(function(error) {
          console.error('Error updating menu item:', error);
        });
    };
  }]);