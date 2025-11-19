function checkLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if the entered username and password are correct
  if (username === 'unssaf' && password === 'init14tor') {
    // If correct, redirect to the game page (page 2)
    window.location.href = 'game.html';
  } else {
    // If incorrect, show an error message
    document.getElementById('login-error').textContent = 'Invalid username or password!';
  }
}
