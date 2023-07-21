const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    
  
    if (username && password) {
        console.log('about to send'+ username+password)
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        alert('You are logged in')
        document.location.replace("/dashboard");
      } else {
        alert("Failed to log in.");
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#name-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    
    if (username && password) {
        
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        alert('Account created. You can now login with your username and pass')
        window.location.replace('/dashboard');
      } else {
        alert('Failed to Sign up');
      }
    }
  };
  
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
  