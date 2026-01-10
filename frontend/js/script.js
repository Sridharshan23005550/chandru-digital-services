console.log("Chandru Digital Services - Script loaded");

// API Base URL
const API_BASE = "https://chandru-digital-services.onrender.com";

// ==============================
// NAVIGATION SCROLL EFFECT
// ==============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ==============================
// LIGHTBOX FUNCTIONALITY
// ==============================
const lightboxImg = document.getElementById("lightbox-img");
const lightboxBox = document.getElementById("lightbox");

if (lightboxImg && lightboxBox) {
  document.querySelectorAll(".lightbox-img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxBox.style.display = "flex";
    });
  });

  lightboxBox.addEventListener("click", () => {
    lightboxBox.style.display = "none";
  });
}

// ==============================
// FADE-IN ON SCROLL
// ==============================
const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));
}

// ==============================
// SERVICE HISTORY TRACKING
// ==============================
document.querySelectorAll(".service-card, .e-service-card").forEach(card => {
  card.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) return;

    const serviceName = card.querySelector("h3")?.textContent || "Unknown Service";

    try {
      await fetch(`${API_BASE}/api/user/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ service: serviceName })
      });
    } catch (err) {
      console.log("History tracking failed:", err);
    }
  });
});

// ==============================
// SMOOTH SCROLL FOR NAV LINKS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector(".navbar")?.offsetHeight || 80;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ==============================
// AUTH TOKEN VERIFICATION
// ==============================
async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE}/api/auth/verify`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

// Verify token on page load
verifyToken();
