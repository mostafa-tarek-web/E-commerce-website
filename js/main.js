// === SLIDESHOW ===
let currentSlide = 0;
let slideTimer;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function moveSlide(n) {
  clearTimeout(slideTimer);
  showSlide(currentSlide + n);
  startTimer();
}

function goToSlide(n) {
  clearTimeout(slideTimer);
  showSlide(n);
  startTimer();
}

function startTimer() {
  slideTimer = setTimeout(() => {
    showSlide(currentSlide + 1);
    startTimer();
  }, 6000);
}

// === CART ===
let cart = [];

function addToCart(name, price, btn) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  showToast(name + ' added to your bag');
  btn.textContent = 'Added ✓';
  setTimeout(() => btn.textContent = 'Add to Cart', 1500);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartItemCount').textContent = count;
  document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);

  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fa fa-shopping-bag"></i>
        <p>Your bag is empty.</p>
      </div>`;
    footer.style.display = 'none';
  } else {
    footer.style.display = 'block';
    container.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
          <div class="qty-ctrl">
            <button onclick="changeQty(${i}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-item" onclick="removeFromCart(${i})">
          <i class="fa fa-times"></i>
        </button>
      </div>
    `).join('');
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

// === WISHLIST ===
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const added = btn.classList.contains('active');
  showToast(added ? 'Added to wishlist' : 'Removed from wishlist');
}

// === TOAST ===
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// === NEWSLETTER ===
function subscribeNewsletter() {
  const input = document.querySelector('.newsletter-form input');
  if (input.value && input.value.includes('@')) {
    showToast('Welcome to the Inner Circle!');
    input.value = '';
  } else {
    showToast('Please enter a valid email.');
  }
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  startTimer();
  document.getElementById('cartBtn').addEventListener('click', e => {
    e.preventDefault();
    openCart();
  });
});
