function downloadStudentsTable() {
  var table = document.getElementById("studentsTable");
  var selectElement = document.getElementById("mon_hoc");
  var mon_hoc = selectElement.options[selectElement.selectedIndex].text;
  var hocphan = document.getElementById("hocphan").value;

  var isScoreTable = false;

  // Check if the table exists
  if (!table) {
    // Try to get the table by the alternative id
    table = document.getElementById("studentsTable_score");
    isScoreTable = true;
  }

  if (table) {
    // Clone the table to avoid modifying the original one
    var clonedTable = table.cloneNode(true);

    // Remove the last column of the score table
    if (isScoreTable) {
      var rows = clonedTable.rows;
      for (var i = 0; i < rows.length; i++) {
        rows[i].deleteCell(-1);
      }
    }

    // Convert the table to a workbook
    var wb = XLSX.utils.table_to_book(clonedTable, { sheet: "Sheet 1" });

    // Create a filename from the course and component names
    var filename = mon_hoc + "_" + hocphan + ".xlsx";

    // Write the workbook to a file
    XLSX.writeFile(wb, filename);
  } else {
    console.log("No table found to download.");
  }
}

//Get the button
var mybutton = document.getElementById("scrollTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function verifyTokenAndProceed(actionFunction, ...args) {
  fetch("http://localhost:3000/verify-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        actionFunction(...args);
      } else {
        alert("Xác thực thất bại, vui lòng đăng nhập lại!");
        window.location.href = "../index.html";
      }
    })
    .catch((error) => console.error("Error:", error));
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("current_username");
  window.location.href = "../index.html";
}
window.onload = function () {
  const savedToken = localStorage.getItem("token");
  const savedUsername = localStorage.getItem("current_username");
  document.getElementById("account-name").innerText = savedUsername;
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10); // Format the date as 'yyyy-mm-dd'
  document.getElementById("date").value = formattedDate;

  if (savedToken) {
    verifyTokenAndProceed(() => {
      document.getElementById("splash-screen").style.display = "none";
      document.getElementById("container").style.display = "flex";
      fetchCourses(); // Call the new function to fetch courses
    });
  } else {
    // If there is no token, redirect to the login page
    window.location.href = "./404.html";
  }
}

function fetchGrades() {
  var courseId = document.getElementById("mon_hoc").value;
  var componentId = document.getElementById("hocphan").value;
  fetch(`http://localhost:3000/student-grades/${courseId}/${componentId}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      const existingTable = document.getElementById("studentsTable") || document.getElementById("studentsTable_score");
      if (existingTable) {
        existingTable.remove();
      }

      const parentElement = document.createElement("div");
      parentElement.innerHTML = `
        <table id="studentsTable_score">
          <tr>
            <th>MSV</th>
            <th>Họ và tên</th>
            <th>Thường xuyên</th>
            <th>Giữa kì</th>
            <th>Cuối kì</th>
            <th>Sửa</th>
          </tr>
        </table>
      `;
      const table = parentElement.querySelector("#studentsTable_score");

      // Add new table rows for each grade
      data.forEach((item) => {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = item.student_id;
        cell2.innerHTML = item.student_name;
        cell3.innerHTML = item.regular_score;
        cell4.innerHTML = item.midterm_score;
        cell5.innerHTML = item.final_score;
        cell6.innerHTML = '<button onclick="editGrade(event)">Sửa</button>';
      });

      // Append the new table to the body of the document
      document.body.appendChild(parentElement);
    })
    .catch((error) => console.error("Error:", error));
}

function editGrade(event) {
  var button = event.target;
  var cell = button.parentNode;
  var row = cell.parentNode;
  const cells = Array.from(row.cells);
  cells.slice(2, 5).forEach((cell) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = cell.innerHTML;
    cell.innerHTML = '';
    cell.appendChild(input);
  });
  button.innerHTML = 'Lưu';
  button.onclick = saveGrade;
}

function saveGrade(event) {
  const button = event.target;
  const row = button.parentNode.parentNode;
  const cells = Array.from(row.cells);
  const studentId = cells[0].innerHTML;
  const courseId = document.getElementById('mon_hoc').value;
  const componentId = document.getElementById('hocphan').value;
  const regularScore = cells[2].querySelector('input').value;
  const midtermScore = cells[3].querySelector('input').value;
  const finalScore = cells[4].querySelector('input').value;

  fetch('http://localhost:3000/update-grade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courseId,
      componentId,
      studentId,
      regularScore,
      midtermScore,
      finalScore,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        cells.slice(2, 5).forEach((cell) => {
          cell.innerHTML = cell.querySelector('input').value;
        });
        button.innerHTML = 'Sửa';
        button.onclick = editGrade;
      } else {
        console.error('Failed to update grade');
      }
    })
    .catch((error) => console.error('Error:', error));
}

function fetchCourses() {
  user_id = localStorage.getItem("current_user");
  fetch(`http://localhost:3000/courses?user_id=${user_id}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("mon_hoc");
      data.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.course_id;
        option.text = course.course_name;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function fetchCourseComponents() {
  const courseId = document.getElementById("mon_hoc").value;
  fetch(`http://localhost:3000/course-components?course_id=${courseId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("hocphan");
      select.innerHTML = ""; // Clear the select element
      data.forEach((component) => {
        const option = document.createElement("option");
        option.value = component.component_id;
        option.text = component.component_name;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function getListStudents() {
  const courseId = document.getElementById("mon_hoc").value;
  const componentId = document.getElementById("hocphan").value;
  verifyTokenAndProceed(() => {
    fetch(
      `http://localhost:3000/get-students?course_id=${courseId}&component_id=${componentId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const existingTable = document.getElementById("studentsTable") || document.getElementById("studentsTable_score");
        if (existingTable) {
          existingTable.remove();
        }

        const parentElement = document.createElement("div");
        parentElement.innerHTML = `
          <table id="studentsTable">
            <tr>
              <th>MSV</th>
              <th>Họ và tên</th>
              <th>Sinh viên khoá</th>
            </tr>
          </table>
        `;
        const table = parentElement.querySelector("#studentsTable");

        // Get all unique attendance dates
        const attendanceDates = [
          ...new Set(data.flatMap((record) => record.attendanceDates)),
        ].sort();

        // Add attendance dates to header row
        const headerRow = table.querySelector("tr");
        attendanceDates.forEach((date) => {
          const formattedDate = new Date(date).toLocaleDateString("vi-VN");
          const newHeader = document.createElement("th");
          newHeader.textContent = formattedDate;
          headerRow.appendChild(newHeader);
        });

        data.forEach((record) => {
          const currentRow = table.insertRow(-1);
          const cell0 = currentRow.insertCell(0);
          const cell1 = currentRow.insertCell(1);
          const cell2 = currentRow.insertCell(2);
          cell0.innerHTML = record.student_id;
          cell1.innerHTML = record.student_name;
          cell2.innerHTML = record.student_year;

          attendanceDates.forEach((date) => {
            const cell = currentRow.insertCell(-1);
            if (record.attendanceDates.includes(date)) {
              cell.innerHTML = record.attended ? "Đã đi học" : "Vắng";
            } else {
              cell.innerHTML = "Vắng";
            }
          });
        });
        document.body.appendChild(parentElement);
      })
      .catch((error) => console.error("Error:", error));
  });

  document.getElementById("create_day").addEventListener("click", function () {
    const dateInput = document.getElementById("date").value;
    const formattedDate = new Date(dateInput).toLocaleDateString("vi-VN");
    const headerRow = document.querySelector("#studentsTable tr");
    const existingHeader = Array.from(headerRow.children).find(
      (th) => th.textContent === formattedDate
    );
    if (!existingHeader) {
      const newHeader = document.createElement("th");
      newHeader.textContent = formattedDate;
      headerRow.appendChild(newHeader);

      // Add a column with a checkbox to each row
      const rows = Array.from(
        document.querySelectorAll("#studentsTable tr")
      ).slice(1); // Exclude the header row
      rows.forEach((row) => {
        const newCell = row.insertCell(-1);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const label = document.createElement("label");
        label.textContent = "Vắng";
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            label.textContent = "Đã đi học";
            updateAttendance(row.cells[0].innerText, true); // Update attendance in the database
          } else {
            label.textContent = "Vắng";
            updateAttendance(row.cells[0].innerText, false); // Update attendance in the database
          }
        });
        newCell.appendChild(checkbox);
        newCell.appendChild(label);
      });
    }
  });

  function updateAttendance(studentId, attended) {
    const courseId = document.getElementById("mon_hoc").value;
    const componentId = document.getElementById("hocphan").value;
    const date = document.getElementById("date").value;
    if (attended) {
      fetch("http://localhost:3000/update-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: courseId,
          component_id: componentId,
          student_id: studentId,
          attendance_date: date,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Attendance updated successfully");
          } else {
            console.error("Failed to update attendance");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(
        `http://localhost:3000/delete-attendance?course_id=${courseId}&component_id=${componentId}&student_id=${studentId}&attendance_date=${date}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Attendance deleted successfully");
          } else {
            console.error("Failed to delete attendance");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }
}
