function loadHeader(type) {
    const user = JSON.parse(localStorage.getItem(type));

    const name = user ? (user.name || user.email) : "";

    document.getElementById("header").innerHTML = `
        <div class="header-container">
            <span class="header-title">${type === "admin" ? "Admin Panel" : "User Dashboard"}</span>
            <span class="header-user">${name}</span>
            <button onclick="goBack()" class="back-btn">Back</button>
            <button onclick="logout()" class="logout-btn">Logout</button>
        </div>
    `;
}

function goBack() {
    window.history.back();
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
