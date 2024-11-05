// script.js

// Fungsi untuk menyimpan data pengguna saat registrasi
function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const registrationDate = new Date().toLocaleDateString("id-ID"); // Format tanggal sesuai dengan format Indonesia
    const user = { name, email, password, registrationDate };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

// Fungsi untuk validasi login pengguna
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Simpan email pengguna yang berhasil login ke localStorage
        localStorage.setItem("loggedInUser", email);
        return true;
    }
    return false;
}

// Event listener untuk halaman register
if (window.location.pathname.includes("register.html")) {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Ambil data dari form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        // Simpan data pengguna ke localStorage
        registerUser(name, email, password);
        
        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "login.html"; // Arahkan ke halaman login setelah registrasi
    });
}

// Event listener untuk halaman login
if (window.location.pathname.includes("login.html")) {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Ambil data dari form
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        // Validasi login
        if (loginUser(email, password)) {
            alert("Login berhasil!");
            window.location.href = "dashboard.html"; // Arahkan ke dashboard setelah login
        } else {
            alert("Email atau password salah, atau akun belum terdaftar.");
        }
    });
}
