angular.module('makmurSehat', [])
  .controller('profileController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $scope.UpdatePassword = function() {
      $window.location.href = 'updatepassword.html'; // Arahkan ke halaman Edit Password
    };
    function fetchUserProfile() {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
      if (!token) {
        alert('You need to log in first.');
        $window.location.href = 'signin.html'; // Redirect ke halaman login jika token tidak ada
        return;
      }

      $http.get('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}` // Kirim token dalam header
        }
      })
      .then(function(response) {
        console.log('Profile data:', response.data);
        $scope.profile = response.data; // Mengisi data profil
      })
      .catch(function(error) {
        if (error.status === 401) {
          alert('You are not authorized. Please log in.');
          $window.location.href = 'signin.html'; // Redirect ke halaman login
        } else {
          console.log('Error fetching profile:', error);
        }
      });
    }

    fetchUserProfile();

    // Logout function
    $scope.logout = function() {
      $window.sessionStorage.removeItem('userId'); // Clear the userId from sessionStorage
      $window.location.href = '/views/signin.html'; // Redirect to login page
    };

    // Delete Account dengan konfirmasi 3 kali klik
    $scope.deleteAttempts = 0; // Hitungan klik

    $scope.deleteAccount = function() {
      $scope.deleteAttempts++;
    
      if ($scope.deleteAttempts < 3) {
        alert(`Klik ${3 - $scope.deleteAttempts} kali lagi untuk menghapus akun.`);
      } else {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          const token = localStorage.getItem('authToken'); // Ambil token JWT dari localStorage
          if (!token) {
            alert('You need to log in first.');
            $window.location.href = 'signin.html';
            return;
          }
    
          $http.delete('http://localhost:5000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}` // Kirim token JWT di header
            }
          })
          .then(function(response) {
            alert('Akun berhasil dihapus.');
            $scope.logout(); // Log out setelah akun dihapus
          })
          .catch(function(error) {
            console.error('Error deleting account:', error);
            alert('Gagal menghapus akun. Coba lagi nanti.');
          });
        }
        $scope.deleteAttempts = 0; // Reset hitungan klik
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
  }]);
