// server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  pool.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      if (password === results[0].password) {
        // Create a token
        const token = jwt.sign({ username: username },process.env.SECRET_KEY, { expiresIn: '7d' });
    
        // Send success message along with the token
        res.json({ success: true, message: 'Logged in successfully', token: token , fullname: results[0].fullname});
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

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.json({ success: false, message: 'Token not valid' }); // If the token is not valid, return an error message
    }

    return res.json({ success: true, message: 'Token is valid' }); // If the token is valid, return a success message
  });
});

app.get('/courses', (req, res) => {
  pool.query('SELECT * FROM courses', function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/course-components', (req, res) => {
  const courseId = req.query.course_id;
  pool.query('SELECT * FROM coursecomponents WHERE course_id = ?', [courseId], function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/get-students', (req, res) => {
  const courseId = req.query.course_id;
  const componentId = req.query.component_id;

  pool.query('SELECT * FROM componentstudents WHERE course_id = ? AND component_id = ?', [courseId, componentId], function(error, results, fields) {
    if (error) throw error;

    const studentDetailPromises = results.map(result => {
      return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM students WHERE student_id = ?', [result.student_id], function(error, studentResults, fields) {
          if (error) {
            reject(error);
          } else {
            pool.query('SELECT * FROM Attendance WHERE student_id = ? AND course_id = ? AND component_id = ?', [result.student_id, courseId, componentId], function(error, attendanceResults, fields) {
              if (error) {
                reject(error);
              } else {
                const attendanceDates = attendanceResults.map(record => record.attendance_date);
                const attended = attendanceDates.length > 0;
                resolve({...studentResults[0], attended, attendanceDates});
              }
            });
          }
        });
      });
    });

    Promise.all(studentDetailPromises)
      .then(studentDetails => res.json(studentDetails))
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching student details.' });
      });
  });
});

app.post('/update-attendance', (req, res) => {
  const { course_id, component_id, student_id, attendance_date } = req.body;

  const query = `INSERT INTO Attendance (course_id, component_id, student_id, attendance_date) 
                 VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE course_id = VALUES(course_id), component_id = VALUES(component_id), student_id = VALUES(student_id), attendance_date = VALUES(attendance_date)`;

  pool.query(query, [course_id, component_id, student_id, attendance_date], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).json({ success: false });
      } else {
          res.json({ success: true });
      }
  });
});
app.delete('/delete-attendance', (req, res) => {
  const { course_id, component_id, student_id, attendance_date } = req.query;

  const query = `DELETE FROM Attendance WHERE course_id = ? AND component_id = ? AND student_id = ? AND attendance_date = ?`;

  pool.query(query, [course_id, component_id, student_id, attendance_date], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).json({ success: false });
      } else {
          res.json({ success: true });
      }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});