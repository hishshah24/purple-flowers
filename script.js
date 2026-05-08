const waNumber = "6281515521739";
const danaNumber = "+62 856-0663-7038"; // Nomor DANA Pembayaran
const price = 15000;
let cart = [];
let userEmail = "";

// Database Nama Bunga (Akan diulang untuk 30 produk)
const flowerBases = [
    "Tulip Purple Candy", "Mawar Kapas Lilac", "Edelweiss Dreamy", 
    "Melati Putih Suci", "Matahari Peach", "Lavender Cold Mist", 
    "Peony Soft Cream", "Hydrangea Blue Sky", "Lily White Pearl", 
    "Sakura Pink Cotton"
];

// 1. Generate 30 Produk Otomatis
const products = [];
for (let i = 1; i <= 30; i++) {
    const baseName = flowerBases[(i - 1) % flowerBases.length];
    products.push({
        id: i,
        name: `${baseName} No. ${i}`,
        img: `img/bunga${i}.jpg`, // Mencari file bunga1.jpg sampai bunga30.jpg
        price: price
    });
}

// 2. Sistem Navigasi Antar Halaman
function showPage(pageId) {
    if (!userEmail) return; // Wajib login untuk akses halaman
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    window.scrollTo(0, 0);
}

// 3. Sistem Login Gmail (Simulasi)
document.getElementById('login-btn').addEventListener('click', () => {
    const email = prompt("Halo Cantik! Masukkan email Gmail Anda untuk masuk:");
    if (email && email.includes("@gmail.com")) {
        userEmail = email;
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('navbar').classList.remove('hidden');
        showPage('home'); // Masuk ke halaman utama setelah login
    } else {
        alert("Maaf, wajib menggunakan akun Gmail ya ✨");
    }
});

// 4. Render Produk ke dalam Katalog (HTML Grid)
function renderKatalog() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "product-card shadow-sm";
        card.innerHTML = `
            <div class="img-box">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x500/f3f0ff/9d81d1?text=Hishshah+Flowers'">
            </div>
            <h3 class="text-xl font-bold text-purple-900 mb-1">${p.name}</h3>
            <p class="text-purple-400 font-bold mb-4 font-fancy text-2xl">Rp 15.000</p>
            <button onclick="addToCart('${p.name}')" class="btn-primary w-full py-3 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <span>🧺</span> Tambah Ke Keranjang
            </button>
        `;
        grid.appendChild(card);
    });
}

// 5. Logika Keranjang (Cart)
function addToCart(name) {
    cart.push(name);
    const cartEl = document.getElementById('floating-cart');
    cartEl.classList.remove('translate-x-[150%]'); // Munculkan cart
    document.getElementById('cart-count').innerText = `${cart.length} Bunga terpilih`;
}

// 6. Checkout WhatsApp + Integrasi Pembayaran DANA
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;

    const total = cart.length * price;
    const list = cart.map((item, i) => `${i + 1}. ${item}`).join('%0A');
    
    // Format Pesan WhatsApp
    const message = `Halo Hishshah Flowers! 🌷🍬%0A%0A` +
                `*DAFTAR BELANJA:*%0A${list}%0A%0A` +
                `*TOTAL HARGA:* Rp ${total.toLocaleString('id-ID')}%0A` +
                `*EMAIL PEMBELI:* ${userEmail}%0A%0A` +
                `----------------------------%0A` +
                `*INFO PEMBAYARAN DANA:*%0A` +
                `Nomor DANA: ${danaNumber}%0A%0A` +
                `Silakan kirim bukti transfer ke nomor ini ya! ✨`;
    
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
});

// 7. Fungsi Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload(); // Segarkan halaman untuk reset state
});

// Jalankan fungsi render saat script dimuat
renderKatalog();
