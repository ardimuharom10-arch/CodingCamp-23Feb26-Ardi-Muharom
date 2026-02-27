// Animasi Sederhana saat Scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.padding = "1rem 10%";
    nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
  } else {
    nav.style.padding = "1.5rem 10%";
    nav.style.boxShadow = "none";
  }
});

// Form Handling with validation and modal preview
const contactForm = document.getElementById("contactForm");
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[s];
  });
}

function openModal() {
  modalOverlay.style.display = "flex";
}

function closeModal() {
  modalOverlay.style.display = "none";
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();

  const errors = [];
  if (!name) errors.push("Nama lengkap wajib diisi.");
  if (!email) errors.push("Email wajib diisi.");
  else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Format email tidak valid.");
  }
  if (!msg) errors.push("Pesan tidak boleh kosong.");

  if (errors.length) {
    modalBody.innerHTML =
      '<ul style="color:#b00020;margin:0 0 1rem 1.25rem;">' +
      errors
        .map(function (it) {
          return "<li>" + escapeHtml(it) + "</li>";
        })
        .join("") +
      "</ul>";
    modalConfirm.style.display = "none";
    openModal();
    return;
  }

  modalBody.innerHTML =
    "\n    <p><strong>Nama:</strong> " +
    escapeHtml(name) +
    "</p>\n    <p><strong>Email:</strong> " +
    escapeHtml(email) +
    "</p>\n    <p><strong>Pesan:</strong><br>" +
    escapeHtml(msg).replace(/\n/g, "<br>") +
    "</p>\n  ";
  modalConfirm.style.display = "inline-block";
  openModal();
});

modalClose.addEventListener("click", closeModal);
modalCancel.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) closeModal();
});

modalConfirm.addEventListener("click", function () {
  // Simulate sending the data (demo)
  alert("Pesan dikonfirmasi.");
  contactForm.reset();
  closeModal();
});
