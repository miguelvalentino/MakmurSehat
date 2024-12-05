app.controller('NavbarController', function($scope) {
    // Menyimpan halaman yang aktif
    $scope.activePage = 'home';

    // Menentukan halaman yang aktif
    $scope.setActive = function(page) {
        $scope.activePage = page;
    };

    // Memeriksa halaman yang aktif
    $scope.isActive = function(page) {
        return $scope.activePage === page;
    };

});

