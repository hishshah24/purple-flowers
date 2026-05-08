const waNumber = "6281515521739";
const danaNumber = "+62 856-0663-7038";
const price = 15000;
let cart = [];
let userEmail = "";

// Database Bunga
const flowerBases = [
    "Tulip Purple Candy", "Mawar Kapas Lilac", "Edelweiss Dreamy", 
    "Melati Putih Suci", "Matahari Peach", "Lavender Cold Mist", 
    "Peony Soft Cream", "Hydrangea Blue Sky"
];

// Generate 30 Produk Otomatis
const products = [];
for (let i = 1; i <= 30; i++) {
    const baseName = flowerBases[(i - 1) % flowerBases.length];
    products.push({
        id: i,
        name: `${baseName} Vol. ${i}`,
        img: `img/bunga${i}.jpg`, // Mencari file bunga1.jpg, bunga2.jpg, dst
        price: price
    });
}

// Sistem Navigasi
function showPage(pageId) {
    if (!userEmail) return;
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Sistem Login
document.getElementById('login-btn').addEventListener('click', () => {
    const email = prompt("Halo Cantik! Masukkan email Gmail Anda untuk masuk:");
    if (email && email.includes("@gmail.com")) {
        userEmail = email;
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('navbar').classList.remove('hidden');
        showPage('home');
    } else {
        alert("Maaf, wajib menggunakan akun Gmail ya ✨");
    }
});

// Render Produk ke Katalog
function renderKatalog() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "product-card shadow-sm";
        card.innerHTML = `
            <div class="img-box">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x500/f3f0ff/9d81d1?text=Fresh+Flower'">
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

// Sistem Keranjang
function addToCart(name) {
    cart.push(name);
    const cartEl = document.getElementById('floating-cart');
    cartEl.classList.remove('translate-x-[150%]');
    document.getElementById('cart-count').innerText = `${cart.length} Bunga terpilih`;
}

// Checkout WhatsApp & Info DANA
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;

    const total = cart.length * price;
    const list = cart.map((item, i) => `${i + 1}. ${item}`).join('%0A');
    
    const message = `Halo Hishshah Flowers! 🌷🍬%0A%0A` +
                `*DETAIL PESANAN:*%0A${list}%0A%0A` +
                `*TOTAL HARGA:* Rp ${total.toLocaleString('id-ID')}%0A` +
                `*EMAIL PEMBELI:* ${userEmail}%0A%0A` +
                `----------------------------%0A` +
                `*INFO PEMBAYARAN (DANA):*%0A` +
                `Nomor: ${danaNumber}%0A` +
                `Silakan kirim bukti transfer ke sini ya! ✨`;
    
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload();
});

renderKatalog();
