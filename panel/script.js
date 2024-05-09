//block.js
window.onload = function() {
    const savedToken = localStorage.getItem('token');
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10); // Format the date as 'yyyy-mm-dd'
    document.getElementById('date').value = formattedDate;
    if (savedToken) {
        // Verify the token with the server
        fetch('http://localhost:3000/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + savedToken // Send the token in the Authorization header
          },
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
                  // Hide the splash screen and show the main content
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('container').style.display = 'flex';
          } else {
            // If the token is not valid, redirect to the login page
            window.location.href = './404.html';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      } else {
        // If there is no token, redirect to the login page
        window.location.href = './404.html';
      }
};
//script.js
function recordAttendance() {
    fetch('http://localhost:3000/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'), // Send the token in the Authorization header
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            record();
        } else {
            alert("Xác thực thất bại, vui lòng đăng nhập lại!");
            window.location.href = '../index.html';
        }
    })
}
function record() {
    const mon_hoc = document.getElementById("mon_hoc").value;
    const hocphan = document.getElementById("hocphan").value;
    if (!mon_hoc || !hocphan) {
        return;
    }else{
      getListStudents();
}
function getListStudents() {
    fetch('http://localhost:3000/verify-token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // Send the token in the Authorization header
      },
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          getStudents();
      } else {
          alert("Xác thực thất bại, vui lòng đăng nhập lại!");
          window.location.href = '../index.html';
      }
  })
}

function getStudents() {
    // Remove the existing table if it exists
    const existingTable = document.getElementById('studentsTable');
    if (existingTable) existingTable.remove();

    fetch('http://localhost:3000/get-students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const parentElement = document.createElement('div'); // Create a parent element
        parentElement.innerHTML = `
            <table id="studentsTable">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Khoá</th>
              </tr>
            </table>
        `;
        const table = parentElement.querySelector("#studentsTable"); // Get the table element from the parent element

        data.forEach(student => {
          const row = table.insertRow(-1);
          const cell0 = row.insertCell(0);
          const cell1 = row.insertCell(1);
          const cell2 = row.insertCell(2);

          cell0.innerHTML = student.id;
          cell1.innerHTML = student.name;
          cell2.innerHTML = student.sinhvien_khoa;
      });
      document.body.appendChild(parentElement); // Append the parent element to the document body
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}
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
              } else {
                  label.textContent = 'Nghỉ học';
              }
          });
          newCell.appendChild(checkbox);
          newCell.appendChild(label)
      });
  }
});
}