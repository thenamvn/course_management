// block.js
function downloadStudentsTable() {
        var table = document.getElementById('studentsTable');
        // Check if the table exists
        if (table) {
            // Convert the table to a workbook
            var wb = XLSX.utils.table_to_book(table, {sheet:"Sheet 1"});

            // Write the workbook to a file
            XLSX.writeFile(wb, 'studentsTable.xlsx');
        }
}

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

        // Get all unique attendance dates
        const attendanceDates = [...new Set(data.flatMap(record => record.attendanceDates))].sort();

        // Add attendance dates to header row
        const headerRow = table.querySelector('tr');
        attendanceDates.forEach(date => {
          const formattedDate = new Date(date).toLocaleDateString('vi-VN');
          const newHeader = document.createElement('th');
          newHeader.textContent = formattedDate;
          headerRow.appendChild(newHeader);
        });

        data.forEach(record => {
          const currentRow = table.insertRow(-1);
          const cell0 = currentRow.insertCell(0);
          const cell1 = currentRow.insertCell(1);
          const cell2 = currentRow.insertCell(2);
          cell0.innerHTML = record.student_id;
          cell1.innerHTML = record.student_name;
          cell2.innerHTML = record.student_year;

          attendanceDates.forEach(date => {
            const cell = currentRow.insertCell(-1);
            if (record.attendanceDates.includes(date)) {
              cell.innerHTML = record.attended ? 'Đã đi học' : 'Vắng';
            } else {
              cell.innerHTML = 'Vắng';
            }
          });
        });
        document.body.appendChild(parentElement);
      })
      .catch(error => console.error('Error:', error));
  });


document.getElementById('create_day').addEventListener('click', function() {
  const dateInput = document.getElementById('date').value;
  const formattedDate = new Date(dateInput).toLocaleDateString('vi-VN');
  const headerRow = document.querySelector('#studentsTable tr');
  const existingHeader = Array.from(headerRow.children).find(th => th.textContent === formattedDate);
  if (!existingHeader) {
      const newHeader = document.createElement('th');
      newHeader.textContent = formattedDate;
      headerRow.appendChild(newHeader);

      // Add a column with a checkbox to each row
      const rows = Array.from(document.querySelectorAll('#studentsTable tr')).slice(1); // Exclude the header row
      rows.forEach(row => {
          const newCell = row.insertCell(-1);
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          const label = document.createElement('label');
          label.textContent = 'Nghỉ học';
          checkbox.addEventListener('change', function() {
              if (this.checked) {
                  label.textContent = 'Đã đi học';
                  updateAttendance(row.cells[0].innerText, true); // Update attendance in the database
              } else {
                  label.textContent = 'Nghỉ học';
                  updateAttendance(row.cells[0].innerText, false); // Update attendance in the database
              }
          });
          newCell.appendChild(checkbox);
          newCell.appendChild(label)
      });
  }
});

function updateAttendance(studentId, attended) {
  const courseId = document.getElementById('mon_hoc').value;
  const componentId = document.getElementById('hocphan').value;
  const date = document.getElementById('date').value;
  if (attended) {
      fetch('http://localhost:3000/update-attendance', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              course_id: courseId,
              component_id: componentId,
              student_id: studentId,
              attendance_date: date
          }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              console.log('Attendance updated successfully');
          } else {
              console.error('Failed to update attendance');
          }
      })
      .catch(error => console.error('Error:', error));
  } else {
      fetch(`http://localhost:3000/delete-attendance?course_id=${courseId}&component_id=${componentId}&student_id=${studentId}&attendance_date=${date}`, {
          method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              console.log('Attendance deleted successfully');
          } else {
              console.error('Failed to delete attendance');
          }
      })
      .catch(error => console.error('Error:', error));
  }
}
}
