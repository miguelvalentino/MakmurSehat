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

    

    
    $scope.initChart = function () {
        const ctx = document.getElementById('userChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Jenis chart: bar, line, pie, dll.
            data: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'], // Label X
                datasets: [{
                    label: 'Jumlah Pengguna Aktif',
                    data: [50, 100, 150, 200, 250, 300], // Data jumlah pengguna
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // Logic untuk Challenge Harian/Mingguan
    $scope.challenges = [
        {
            title: "Minum 8 Gelas Air Hari Ini",
            status: false,
            image: "../assets/drinkwater.webp"
        },
        {
            title: "Berjalan 10.000 Langkah",
            status: false,
            image: "../assets/walk10000steps.webp"
        },
        {
            title: "Hindari Konsumsi Gula Selama 1 Hari",
            status: false,
            image: "../assets/no sugar.jpg"
        },
        {
            title: "Meditasi 15 Menit",
            status: false,
            image: "../assets/meditation.png"
        }
    ];
    

    $scope.toggleStatus = function(challenge) {
        challenge.status = !challenge.status;
    };
});

