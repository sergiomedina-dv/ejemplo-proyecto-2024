const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample user database (replace this with your actual database)
const users = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    passwordHash: '$2a$10$2dW5DoqO8tNj3m4kDGljw.YwqGcIe5zN9S2.3.vf2qBZGxB2fQrmG', // Hashed password: "password1"
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    passwordHash: '$2a$10$2dW5DoqO8tNj3m4kDGljw.YwqGcIe5zN9S2.3.vf2qBZGxB2fQrmG', // Hashed password: "password2"
  },
];

// Middleware
app.use(bodyParser.json());

// Login route
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare passwords
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Passwords match, authentication successful
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
