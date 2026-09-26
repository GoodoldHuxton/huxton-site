const products = [
  { id: 1, name: "Tempest X17", cat: "oyun", badge: "Amiral Gemisi", price: 104999, old: 114999,
    color: ["#ff2d55", "#6a00ff"], specs: ["Intel Core Ultra 9", "RTX 5080 16GB", "32GB DDR5 · 2TB SSD", "17.3\" QHD 240Hz"] },
  { id: 2, name: "Tempest X15", cat: "oyun", badge: "Çok Satan", price: 74999, old: 82999,
    color: ["#ff6a00", "#ff2d55"], specs: ["AMD Ryzen 9", "RTX 5070 Ti 12GB", "32GB DDR5 · 1TB SSD", "15.6\" QHD 240Hz"] },
  { id: 3, name: "Vortex 15", cat: "oyun", badge: "Fiyat/Performans", price: 42999,
    color: ["#00c2ff", "#6a00ff"], specs: ["Intel Core i7", "RTX 5060 8GB", "16GB DDR5 · 1TB SSD", "15.6\" FHD 165Hz"] },
  { id: 4, name: "Atlas Pro 16", cat: "is", badge: "İş İstasyonu", price: 68999,
    color: ["#1db954", "#00c2ff"], specs: ["Intel Core Ultra 7", "RTX 5000 Ada", "64GB DDR5 · 2TB SSD", "16\" 4K OLED"] },
  { id: 5, name: "Atlas 14", cat: "is", badge: "Ofis", price: 32999,
    color: ["#8a8aa3", "#3a3a55"], specs: ["Intel Core Ultra 5", "Intel Arc", "16GB LPDDR5 · 512GB SSD", "14\" FHD+ IPS"] },
  { id: 6, name: "Aero 14", cat: "ultra", badge: "1.1 kg", price: 49999, old: 54999,
    color: ["#f5c542", "#ff6a00"], specs: ["Intel Core Ultra 7", "Intel Arc", "32GB LPDDR5 · 1TB SSD", "14\" 2.8K OLED 120Hz"] },
];

const fmt = n => n.toLocaleString("tr-TR") + " TL";
const $ = id => document.getElementById(id);

const laptopSvg = ([a, b], id) => `
  <svg viewBox="0 0 200 130" aria-hidden="true">
    <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect x="30" y="5" width="140" height="90" rx="6" fill="#111" stroke="#333"/>
    <rect x="37" y="12" width="126" height="76" rx="2" fill="url(#g${id})"/>
    <path d="M10 100 L190 100 L180 118 L20 118 Z" fill="#22222c" stroke="#333"/>
  </svg>`;

function renderProducts(filter = "all") {
  const list = filter === "all" ? products : products.filter(p => p.cat === filter);
  $("products").innerHTML = list.map(p => `
    <article class="product">
      <div class="product-img" style="background:linear-gradient(135deg, ${p.color[0]}22, ${p.color[1]}22)">${laptopSvg(p.color, p.id)}</div>
      <span class="badge">${p.badge}</span>
      <h3>${p.name}</h3>
      <ul class="specs">${p.specs.map(s => `<li>${s}</li>`).join("")}</ul>
      <div class="price-row">
        <div class="price">${p.old ? `<del>${fmt(p.old)}</del>` : ""}${fmt(p.price)}</div>
        <button class="add-btn" data-id="${p.id}">Sepete Ekle</button>
      </div>
    </article>`).join("");
}

// Filters
$("filters").addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  renderProducts(e.target.dataset.filter);
});

// Cart
let cart = [];
try { cart = JSON.parse(localStorage.getItem("huxton-cart")) || []; } catch {}

function saveCart() {
  try { localStorage.setItem("huxton-cart", JSON.stringify(cart)); } catch {}
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * products.find(p => p.id === i.id).price, 0);
  $("cartCount").textContent = count;
  $("cartTotal").textContent = fmt(total);
  $("cartItems").innerHTML = cart.length ? cart.map(i => {
    const p = products.find(p => p.id === i.id);
    return `<li>
      <div><strong>${p.name}</strong><div class="muted small">${fmt(p.price)}</div></div>
      <div class="qty"><button data-dec="${p.id}">−</button>${i.qty}<button data-inc="${p.id}">+</button></div>
    </li>`;
  }).join("") : `<li class="cart-empty">Sepetin boş.</li>`;
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty += delta;
  else if (delta > 0) cart.push({ id, qty: 1 });
  cart = cart.filter(i => i.qty > 0);
  saveCart();
  renderCart();
}

$("products").addEventListener("click", e => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  changeQty(Number(btn.dataset.id), 1);
  btn.textContent = "Eklendi ✓";
  btn.classList.add("added");
  setTimeout(() => { btn.textContent = "Sepete Ekle"; btn.classList.remove("added"); }, 1200);
});

$("cartItems").addEventListener("click", e => {
  if (e.target.dataset.inc) changeQty(Number(e.target.dataset.inc), 1);
  if (e.target.dataset.dec) changeQty(Number(e.target.dataset.dec), -1);
});

const toggleCart = open => {
  $("cart").classList.toggle("open", open);
  $("overlay").classList.toggle("show", open);
};
$("cartBtn").addEventListener("click", () => toggleCart(true));
$("cartClose").addEventListener("click", () => toggleCart(false));
$("overlay").addEventListener("click", () => toggleCart(false));
$("checkout").addEventListener("click", () => {
  if (!cart.length) return;
  alert("Bu bir portfolyo demosudur, gerçek sipariş alınmaz. İlginiz için teşekkürler!");
  cart = [];
  saveCart();
  renderCart();
  toggleCart(false);
});

// Mobile menu
$("burger").addEventListener("click", () => $("menu").classList.toggle("open"));
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => $("menu").classList.remove("open")));

// Contact form (demo)
$("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  $("formMsg").textContent = "Mesajın alındı! En kısa sürede dönüş yapacağız.";
  e.target.reset();
});

renderProducts();
renderCart();
