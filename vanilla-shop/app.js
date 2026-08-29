// Nimbus store — plain JS. No product analytics wired in (that's the task).
const PRODUCTS = [
  { id: "tee", name: "Cloud Tee", price: 28 },
  { id: "mug", name: "Nimbus Mug", price: 14 },
  { id: "cap", name: "Field Cap", price: 24 },
  { id: "tote", name: "Canvas Tote", price: 32 },
  { id: "socks", name: "Wool Socks", price: 16 },
  { id: "bottle", name: "Steel Bottle", price: 26 },
];
const cart = [];

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  for (const p of PRODUCTS) {
    const el = document.createElement("div");
    el.className = "product";
    el.innerHTML =
      `<div class="thumb"></div><div class="body">` +
      `<h3>${p.name}</h3><div class="price">$${p.price}</div>` +
      `<button class="add" data-add="${p.id}">Add to cart</button></div>`;
    grid.appendChild(el);
  }
}

function renderCart() {
  document.getElementById("cart-count").textContent = String(cart.length);
  const lines = document.getElementById("cart-lines");
  lines.innerHTML = cart.length ? "" : "<p style='color:#6b6862'>Your cart is empty.</p>";
  for (const item of cart) {
    const row = document.createElement("div");
    row.className = "line";
    row.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
    lines.appendChild(row);
  }
}

function handleAddToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  cart.push(product);
  console.log("added to cart", product);
  renderCart();
}

function handleCheckout() {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  console.log("checkout started", { items: cart.length, total });
  alert(`Order placed: ${cart.length} items, $${total}`);
  cart.length = 0;
  renderCart();
  document.getElementById("cart-dialog").close();
}

document.getElementById("product-grid").addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-add");
  if (id) handleAddToCart(id);
});
document.getElementById("cart-btn").addEventListener("click", () => {
  console.log("cart opened");
  document.getElementById("cart-dialog").showModal();
});
document.getElementById("checkout-btn").addEventListener("click", handleCheckout);
renderProducts();
renderCart();
