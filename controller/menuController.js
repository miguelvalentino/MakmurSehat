// Inisialisasi aplikasi AngularJS
var app = angular.module('menuApp', []);

// Controller untuk aplikasi
app.controller('menuController', function ($scope) {
    // Data menu makanan
    $scope.menus = [
        {
            name: 'Salad Buah',
            description: 'Campuran buah segar dengan saus yogurt.',
            price: 25000,
            image: 'assets/SaladBuah.webp',
        },
        {
            name: 'Ayam Panggang',
            description: 'Ayam panggang dengan bumbu rempah.',
            price: 50000,
            image: 'assets/ayampanggang.jpg',
        },
        {
            name: 'Nasi Goreng Sehat',
            description: 'Nasi goreng dengan sayuran segar.',
            price: 30000,
            image: 'assets/nasigoreng.jpg',
        },
        {
            name: 'Smoothie Bowl',
            description: 'Smoothie dari buah segar dengan topping granola.',
            price: 35000,
            image: 'assets/smoothiebowl.jpg',
        },
        {
            name: 'Sup Ayam Sehat',
            description: 'Sup ayam rendah lemak dengan sayuran.',
            price: 40000,
            image: 'assets/supayam.jpg',
        },
        {
            name: 'Avocado Toast',
            description: 'Roti panggang dengan olesan alpukat dan topping sehat.',
            price: 45000,
            image: 'assets/avocadotoast.jpeg',
        },
    ];

    // Data keranjang belanja
    $scope.cart = [];

    // Tambahkan menu ke keranjang
    $scope.addToCart = function (menu) {
        $scope.cart.push(menu);
    };

    // Tambahkan fungsi untuk menghapus item dari keranjang
    $scope.removeFromCart = function (index) {
    $scope.cart.splice(index, 1);
   };


    // Hitung total harga
    $scope.getTotal = function () {
        return $scope.cart.reduce((total, item) => total + item.price, 0);
    };

    $scope.placeOrder = function () {
        // Tampilkan pesan pop-up
        alert("Pesanan Berhasil! Tunggu ya!");
        
        // Kosongkan keranjang
        $scope.cart = [];
    };
    
});
