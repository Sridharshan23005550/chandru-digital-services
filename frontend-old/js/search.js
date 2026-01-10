const services = {
  "Aadhaar / PAN": "services/services-aadhar.html",
  "Web Services": "services/services-web.html",
  "Ticket Booking": "services/services-ticket.html",
  "Digital Support": "services/services-support.html",
  "Portraits & Events": "services/services-portraits.html",
  "Landscape & Travel": "services/services-travel.html",
  "Digital Editing": "services/services-digital.html"
};

const searchInput = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const clearBtn = document.getElementById("clearSearch");

let currentIndex = -1;

/* 🔁 Restore last search */
const lastSearch = localStorage.getItem("lastSearch");
if (lastSearch) {
  searchInput.value = lastSearch;
  renderSuggestions(lastSearch);
}

/* Render dropdown */
function renderSuggestions(value) {
  suggestions.innerHTML = "";
  currentIndex = -1;

  if (!value) {
    suggestions.style.display = "none";
    clearBtn.style.display = "none";
    return;
  }

  clearBtn.style.display = "block";
  localStorage.setItem("lastSearch", value);

  Object.keys(services).forEach(service => {
    if (service.toLowerCase().includes(value.toLowerCase())) {
      const li = document.createElement("li");
      li.textContent = service;

      li.onclick = () => {
        window.location.href = services[service];
      };

      suggestions.appendChild(li);
    }
  });

  suggestions.style.display =
    suggestions.children.length > 0 ? "block" : "none";
}

/* Typing */
searchInput.addEventListener("input", e => {
  renderSuggestions(e.target.value.trim());
});

/* Keyboard navigation */
searchInput.addEventListener("keydown", e => {
  const items = suggestions.querySelectorAll("li");
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    currentIndex = (currentIndex + 1) % items.length;
  } else if (e.key === "ArrowUp") {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
  } else if (e.key === "Enter" && currentIndex >= 0) {
    window.location.href =
      services[items[currentIndex].textContent];
  }

  items.forEach((item, i) =>
    item.classList.toggle("active", i === currentIndex)
  );
});

/* Clear search */
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  suggestions.innerHTML = "";
  suggestions.style.display = "none";
  clearBtn.style.display = "none";
  localStorage.removeItem("lastSearch");
});
