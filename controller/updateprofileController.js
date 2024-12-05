angular.module('makmurSehat', [])
  .controller('updateProfileController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    //ambil data token dari localstorage
    const token = localStorage.getItem('authToken');
    
    //data user
    $scope.user = {
      name: '',
      no_telpon: '',
      pekerjaan: '',
      negara_asal: ''
    };

    //untuk mengambil data profile user
    $scope.loadProfile = function() {
      $http.get('http://localhost:5000/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(function(response) {
        $scope.user = response.data;
      }).catch(function(error) {
        console.error('Gagal mengambil data profil:', error);
        alert('Gagal mengambil data profil!');
      });
    };

    //untuk update data profile user
    $scope.updateProfile = function() {
        $http.put('http://localhost:5000/api/users/update', $scope.user, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(function(response) {
            console.log('Respon server:', response);
            alert('Profile updated successfully!');
            $window.location.href = 'profile.html';
        }).catch(function(error) {
            console.error('Gagal memperbarui profil:', error);
            alert('Gagal memperbarui profil!');
        });
    };

    //panggil loadprofile kalau halaman dibuka
    $scope.loadProfile();
  }]);
