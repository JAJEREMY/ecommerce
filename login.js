// Hardcoded credentials for demo purposes
const savedUsername = "admin";  
const savedPassword = "password123";  
let attempts = 3;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    if (username === savedUsername && password === savedPassword) {
        alert("Login successful! Redirecting to shop...");
        localStorage.setItem("isLoggedIn", "true");  // Store login status
        localStorage.setItem("username", username);  // Store username
        window.location.href = "shop.html"; 
    } else {
        attempts--;
        errorMessage.innerHTML = `Invalid login. ${attempts} attempts left.`;
        errorMessage.style.color = "red";

        if (attempts === 0) {
            alert("Too many failed attempts. Redirecting to error page...");
            window.location.href = "error.html"; 
        }
    }
});
