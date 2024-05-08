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
            setTimeout(function(){
              alert("Hết thời gian truy cập 15 phút, vui lòng đăng nhập lại!");
              window.location.href = '../index.html';
            }, 900000); // 15 phút
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
    const studentName = document.getElementById("studentName").value;
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;
    const course = document.getElementById("courseName").value;
    if (!studentName || !status || !date || !course) {
        return;
    }else{
        const table = document.getElementById("attendanceTable");
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = studentName;
        cell2.innerHTML = status;
        cell3.innerHTML = date;
        cell4.innerHTML = course;
    }
}
