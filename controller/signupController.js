angular.module('makmurSehat', [])
  .controller('signupController', function($scope, $http) {
    $scope.signup = function() {
      //pastiin semua field diisi
      if (!$scope.name || !$scope.email || !$scope.no_telpon || !$scope.pekerjaan || !$scope.negara_asal || !$scope.password || !$scope.confirmPassword) {
        alert('Semua field harus diisi!'); //alert kalau ada yang kosong
        return; 
      }

      //pastiin password dan konfirmasi password sama
      if ($scope.password !== $scope.confirmPassword) {
        alert('Password dan konfirmasi password tidak sama!'); //alert jika password tidak cocok
        return;
      }

      //data user yang dikirim ke server postgresql
      var userData = {
        name: $scope.name,            
        email: $scope.email,          
        no_telpon: $scope.no_telpon,
        pekerjaan: $scope.pekerjaan,  
        negara_asal: $scope.negara_asal, 
        password: $scope.password,    
        confirmPassword: $scope.confirmPassword 
      };

      //kirim data signup ke server menggunakan HTTP POST
      $http.post('http://localhost:5000/api/users/signup', userData)
        .then(function(response) {
          //kalau berhasil, kasih alert berhasil + ke halaman login
          alert('Sign Up berhasil!');
          window.location.href = 'signin.html';
        }, function(error) {
          //error jika proses signup gagal
          if (error.data && error.data.error) {
            //error spesifik dikembalikan server seperti email sudah terdaftar
            if (error.data.error === 'Email sudah terdaftar') {
              alert('Email sudah terdaftar! Silakan gunakan email lain.');
            } else {
              //error lainnya
              alert('Sign Up gagal: ' + error.data.error);
            }
          } else {
            //error tanpa detail
            alert('Terjadi kesalahan. Coba lagi nanti.');
          }
        });
    };
  });
