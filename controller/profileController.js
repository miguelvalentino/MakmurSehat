angular.module('makmurSehat', [])
  .controller('profileController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    //link ke updatepassword.html
    $scope.UpdatePassword = function() {
      $window.location.href = 'updatepassword.html'; 
    };
    function fetchUserProfile() {
      //ambil token dari localstorage
      const token = localStorage.getItem('authToken'); 
      if (!token) {
        alert('You need to log in first.');
        $window.location.href = 'signin.html'; //redirect ke halaman login kalau tidak ada token
        return;
      }

      $http.get('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}` //Kirim token
        }
      })
      .then(function(response) {
        console.log('Profile data:', response.data);
        $scope.profile = response.data; //mengisi data profil
      })
      .catch(function(error) {
        if (error.status === 401) {
          alert('You are not authorized. Please log in.');
          $window.location.href = 'signin.html'; //redirect ke halaman login
        } else {
          console.log('Error fetching profile:', error);
        }
      });
    }

    fetchUserProfile();

    //logout
    $scope.logout = function() {
      $window.sessionStorage.removeItem('userId'); //hapus userid dari session storage
      $window.location.href = '/views/signin.html'; //redirect ke login page
    };

    //delete account dengan konfirmasi 3 kali klik tombol
    $scope.deleteAttempts = 0; // Hitungan klik

    $scope.deleteAccount = function() {
      $scope.deleteAttempts++;
    
      if ($scope.deleteAttempts < 3) {
        alert(`Klik ${3 - $scope.deleteAttempts} kali lagi untuk menghapus akun.`);
      } else {
        if (confirm('anda yakin ingin menghapus akun? akun anda tidak akan kembali.')) {
          const token = localStorage.getItem('authToken'); //ambil token JWT dari localstorage
          if (!token) {
            alert('You need to log in first.');
            $window.location.href = 'signin.html';
            return;
          }
    
          $http.delete('http://localhost:5000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}` //kirim token JWT diheader
            }
          })
          .then(function(response) {
            alert('Akun berhasil dihapus.');
            $scope.logout(); //logout setelah akun user dihapus
          })
          .catch(function(error) {
            console.error('Error deleting account:', error);
            alert('Gagal menghapus akun. Coba lagi nanti.');
          });
        }
        $scope.deleteAttempts = 0; //reset hitungan klik
      }
    };    

    $scope.editPassword = function(oldPassword, newPassword, confirmPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        alert('Semua field harus diisi.');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('Password baru dan konfirmasi password tidak cocok.');
        return;
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('You need to log in first.');
        $window.location.href = 'signin.html'; // Redirect ke halaman login
        return;
      }

      $http.put('http://localhost:5000/api/users/password', {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(function(response) {
        alert('Password berhasil diperbarui.');
        $scope.oldPassword = '';
        $scope.newPassword = '';
        $scope.confirmPassword = '';

        $window.location.href = 'profile.html';
      })
      .catch(function(error) {
        console.error('Error updating password:', error);
        if (error.status === 400) {
          alert('Password lama salah.');
        } else {
          alert('Gagal memperbarui password. Coba lagi nanti.');
        }
      });
    };
    // Data profil pengguna
    $scope.profile = {
      name: "John Doe",
      pekerjaan: "Software Engineer",
      email: "",
      no_telpon: "08123456789",
      negara_asal: ""
  };

  // Fungsi untuk menghitung kelengkapan profil
  $scope.calculateProfileCompletion = function () {
      let filledFields = 0;
      const totalFields = 5; // Jumlah field profil

      // Menghitung field yang terisi
      if ($scope.profile.name) filledFields++;
      if ($scope.profile.pekerjaan) filledFields++;
      if ($scope.profile.email) filledFields++;
      if ($scope.profile.no_telpon) filledFields++;
      if ($scope.profile.negara_asal) filledFields++;

      // Menghitung persentase kelengkapan
      $scope.profileCompletion = Math.round((filledFields / totalFields) * 100);
  };

  // Panggil fungsi ini saat controller di-load
  $scope.calculateProfileCompletion();
  }]);
