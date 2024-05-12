// client.js
window.onload = function() {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');

  if (savedUsername && savedPassword) {
    document.getElementById('username').value = savedUsername;
    document.getElementById('password').value = savedPassword;
    document.getElementById('remember-me').checked = true;
  }
};

// JavaScript
document.getElementById('show-password').addEventListener('change', function() {
  const passwordInput = document.getElementById('password');
  if (this.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

document.getElementById('remember-me').addEventListener('change', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (this.checked) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  } else {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
});

document.getElementById('login-button').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Send a POST request to the /login route
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Save the token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('current_username', username);
      // render to the home page
      window.location.href = '/panel';
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});