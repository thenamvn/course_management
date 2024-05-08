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

document.getElementById('login-button').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if "Remember me" is checked
  const rememberMe = document.getElementById('remember-me').checked;
  if (rememberMe) {
    // Save username and password to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  } else {
    // If "Remember me" is not checked, clear the username and password from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

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