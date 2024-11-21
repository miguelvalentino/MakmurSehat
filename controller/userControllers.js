document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    if (!form) return console.log("Form tidak ditemukan!");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target).entries());

        //buat password dan konfirmasi password sama
        if (data.password !== data.confirmPassword) return alert('Password atau Konfirmasi Password tidak sama!');

        //
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                window.location.href = 'signin.html';
            } else {
                alert(result.error || 'Terjadi error saat mendaftar.');
            }
        } catch {
            alert('Gagal mendaftar.');
        }
    });
});
