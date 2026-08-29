// The Overlook blog — plain JS. No product analytics wired in (that's the task).
const POSTS = [
  { slug: "shipping-small", title: "The case for shipping small", date: "Aug 20, 2026", read: "6 min" },
  { slug: "logs-you-read", title: "Write logs you'll actually read", date: "Aug 12, 2026", read: "4 min" },
  { slug: "boring-stack", title: "In praise of the boring stack", date: "Jul 30, 2026", read: "8 min" },
];

function renderPosts() {
  const el = document.getElementById("posts");
  el.innerHTML = "";
  for (const post of POSTS) {
    const a = document.createElement("article");
    a.innerHTML =
      `<h2><a href="#${post.slug}" data-post="${post.slug}">${post.title}</a></h2>` +
      `<div class="meta">${post.date} · ${post.read} read</div>`;
    el.appendChild(a);
  }
}

function handleViewPost(slug) {
  console.log("post opened", slug);
}

function handleSubscribe(event) {
  event.preventDefault();
  const email = document.getElementById("subscribe-email").value;
  console.log("newsletter subscribed", email);
  alert("Thanks for subscribing!");
  event.target.reset();
}

function handleContact(event) {
  event.preventDefault();
  const name = document.getElementById("contact-name").value;
  console.log("contact submitted", { name });
  alert("Message sent!");
  event.target.reset();
}

document.getElementById("posts").addEventListener("click", (e) => {
  const slug = e.target.getAttribute("data-post");
  if (slug) handleViewPost(slug);
});
document.getElementById("subscribe-form").addEventListener("submit", handleSubscribe);
document.getElementById("contact-form").addEventListener("submit", handleContact);
renderPosts();
