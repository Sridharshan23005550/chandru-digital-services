document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".gallery-btn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openGallery();
    });
  }
});

const galleryImages = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg"
];

// Open modal
function openGallery() {
  const modal = document.getElementById("galleryModal");
  const grid = document.getElementById("galleryGrid");

  grid.innerHTML = "";

  galleryImages.forEach(img => {
    const image = document.createElement("img");
    image.src = `images/live-gallery/${img}`;
    grid.appendChild(image);
  });

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close modal
function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
  document.body.style.overflow = "auto";
}
