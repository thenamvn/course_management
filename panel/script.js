// block.js
function verifyTokenAndProceed(actionFunction, ...args) {
  fetch('http://localhost:3000/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        actionFunction(...args);
      } else {
        alert("Xác thực thất bại, vui lòng đăng nhập lại!");
        window.location.href = '../index.html';
      }
    })
    .catch(error => console.error('Error:', error));
}

window.onload = function() {
  const savedToken = localStorage.getItem('token');
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10); // Format the date as 'yyyy-mm-dd'
  document.getElementById('date').value = formattedDate;

  if (savedToken) {
    verifyTokenAndProceed(() => {
      document.getElementById('splash-screen').style.display = 'none';
      document.getElementById('container').style.display = 'flex';

      fetchCourses(); // Call the new function to fetch courses
    });
  } else {
    // If there is no token, redirect to the login page
    window.location.href = './404.html';
  }
};

function fetchCourses() {
  fetch('http://localhost:3000/courses', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('mon_hoc');
      data.forEach(course => {
        const option = document.createElement('option');
        option.value = course.course_id;
        option.text = course.course_name;
        select.appendChild(option);
      });
    })
    .catch(error => console.error('Error:', error));
}

function fetchCourseComponents() {
  const courseId = document.getElementById('mon_hoc').value;
  fetch(`http://localhost:3000/course-components?course_id=${courseId}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('hocphan');
      select.innerHTML = ''; // Clear the select element
      data.forEach(component => {
        const option = document.createElement('option');
        option.value = component.component_id;
        option.text = component.component_name;
        select.appendChild(option);
      });
    })
    .catch(error => console.error('Error:', error));
}

function getListStudents() {
  const courseId = document.getElementById('mon_hoc').value;
  const componentId = document.getElementById('hocphan').value;
  verifyTokenAndProceed(() => {
    fetch(`http://localhost:3000/get-students?course_id=${courseId}&component_id=${componentId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const existingTable = document.getElementById('studentsTable');
        if (existingTable) {
          existingTable.remove();
        }

        const parentElement = document.createElement('div');
        parentElement.innerHTML = `
          <table id="studentsTable">
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Sinh viên khoá</th>
            </tr>
          </table>
        `;
        const table = parentElement.querySelector("#studentsTable");

        data.forEach(student => {
          const row = table.insertRow(-1);
          const cell0 = row.insertCell(0);
          const cell1 = row.insertCell(1);
          const cell2 = row.insertCell(2);

          cell0.innerHTML = student.student_id;
          cell1.innerHTML = student.student_name;
          cell2.innerHTML = student.student_year;
        });
        document.body.appendChild(parentElement);
      })
      .catch(error => console.error('Error:', error));
  });
}
