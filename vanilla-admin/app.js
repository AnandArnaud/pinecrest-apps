// Acme Admin — plain JS. No product analytics wired in (that's the task).
const state = {
  items: [
    { id: 1, name: "Starter Plan", price: "$9", status: "active" },
    { id: 2, name: "Growth Plan", price: "$49", status: "active" },
    { id: 3, name: "Enterprise Plan", price: "Custom", status: "draft" },
  ],
};

function show(view) {
  document.getElementById("login-view").classList.toggle("hidden", view !== "login");
  document.getElementById("dashboard-view").classList.toggle("hidden", view !== "dashboard");
}

function renderItems() {
  const body = document.getElementById("items-body");
  body.innerHTML = "";
  for (const item of state.items) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      `<td>${item.name}</td><td>${item.price}</td><td>${item.status}</td>` +
      `<td class="row-actions"><button class="ghost" data-delete="${item.id}">Delete</button></td>`;
    body.appendChild(tr);
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  // TODO: authenticate the user. On success:
  console.log("signed in", email);
  show("dashboard");
  renderItems();
}

function handleCreateItem() {
  const name = prompt("Product name");
  if (!name) return;
  const item = { id: Date.now(), name, price: "$0", status: "draft" };
  state.items.push(item);
  console.log("product created", item);
  renderItems();
}

function handleDeleteItem(id) {
  state.items = state.items.filter((i) => i.id !== Number(id));
  console.log("product deleted", id);
  renderItems();
}

function handleLogout() {
  console.log("signed out");
  show("login");
}

document.getElementById("login-form").addEventListener("submit", handleLogin);
document.getElementById("new-item-btn").addEventListener("click", handleCreateItem);
document.getElementById("logout-btn").addEventListener("click", handleLogout);
document.getElementById("items-body").addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-delete");
  if (id) handleDeleteItem(id);
});
