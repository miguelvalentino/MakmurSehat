//modul AngularJS 
angular.module('makmurSehat', [])
  .controller('signinController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.signin = function() {
      //periksa email dan password diisi
      if ($scope.email && $scope.password) {
        var data = {
          email: $scope.email,
          password: $scope.password
        };

        //kirim POST ke server dengan data login user
        $http.post('http://localhost:5000/api/users/signin', data, { withCredentials: true })
          .then(function(response) {
            if (response.data.token) {
              //save token ke localstorage untuk otentikasi
              localStorage.setItem('authToken', response.data.token);
              console.log('Token stored:', response.data.token);
              //alert login berhasil
              alert('Login berhasil!');
              window.location.href = 'profile.html';
            } else {
              //kalau token tidak ada, muncul error diconsole
              console.error('Token tidak ditemukan dalam respons:', response.data);
              alert('Login gagal! Token tidak ditemukan.');
            }
          })
          .catch(function(error) {
            //error jika login gagal
            console.error('Login gagal:', error);
            alert('Login gagal! Periksa email dan password.');
          });
      } else {
        //alert kalau email atau password belum diisi
        alert('Email dan password harus diisi!');
      }
    };
  }]);
