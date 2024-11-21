app.controller('NavbarController', function($scope) {
    // ngesave page yang aktif
    $scope.activePage = 'home';

    // menentukan page yang aktif
    $scope.setActive = function(page) {
        $scope.activePage = page;
    };

    // periksa page saat ini aktif atau tidak
    $scope.isActive = function(page) {
        return $scope.activePage === page;
    };
});