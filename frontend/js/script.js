function openLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.msg);

    if (data.msg === "Login success") {
      closeLogin();
      // later: redirect to admin panel
    }
  } catch (error) {
    alert("Server not reachable");
  }
}
async function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const res = await fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message })
  });

  const data = await res.json();
  alert(data.msg);
}
