// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'ntnhacker1',
  password: 'Nam@2182004',
  database: 'webdatabase',
  port: 3306
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  pool.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      if (password === results[0].password) {
        // Create a token
        const token = jwt.sign({ username: username }, 'thenamvn', { expiresIn: '1d' });
    
        // Send success message along with the token
        res.json({ success: true, message: 'Logged in successfully', token: token });
      } else {
        res.json({ success: false, message: 'Incorrect Username and/or Password!' });
      }
    } else {
      res.json({ success: false, message: 'Incorrect Username and/or Password!' });
    }
  });
});
app.post('/verify-token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // If there's no token, return 401 (Unauthorized)
  }

  jwt.verify(token, 'thenamvn', (err, user) => {
    if (err) {
      return res.json({ success: false, message: 'Token not valid' }); // If the token is not valid, return an error message
    }

    return res.json({ success: true, message: 'Token is valid' }); // If the token is valid, return a success message
  });
});

app.post('/get-students', (req, res) => {
  pool.query('SELECT * FROM sinhvien', function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
}
);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});