//block.js
window.onload = function() {
    const savedToken = localStorage.getItem('token');
  // Set the default date to today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('vi-VN'); // Format the date as dd/mm/yyyy
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
    const date = document.getElementById("date").value;
    const hocphan = document.getElementById("hocphan").value;
    if (!mon_hoc || !date || !hocphan) {
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
            <h2>Students</h2>
            <table id="studentsTable">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Khoá</th>
                <th>Đi học</th>
              </tr>
            </table>
        `;
        const table = parentElement.querySelector("#studentsTable"); // Get the table element from the parent element

        data.forEach(student => {
            const row = table.insertRow(-1);
            const cell0 = row.insertCell(0);
            const cell1 = row.insertCell(1);
            const cell2 = row.insertCell(2);
            const cell3 = row.insertCell(3);

            cell0.innerHTML = student.id;
            cell1.innerHTML = student.name;
            cell2.innerHTML = student.sinhvien_khoa;
            cell3.innerHTML = '<input type="checkbox" />';
        });

        document.body.appendChild(parentElement); // Append the parent element to the document body
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
}