I want to build an SQL database for student management, including courses, course components, student lists for each course component, and attendance records. Example schema for database:
<pre>
<code>
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
);

CREATE TABLE CourseComponents (
    component_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    component_sequence INT NOT NULL,
    component_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    UNIQUE KEY (course_id, component_sequence)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL
);

CREATE TABLE ComponentStudents (
    component_id INT,
    student_id INT,
    course_id INT,
    PRIMARY KEY (component_id, student_id, course_id),
    UNIQUE KEY (course_id, student_id),
    FOREIGN KEY (component_id) REFERENCES CourseComponents(component_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY,
    component_id INT,
    student_id INT,
    attendance_date DATE NOT NULL,
    course_id INT,
    FOREIGN KEY (component_id) REFERENCES CourseComponents(component_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
</code>
</pre>
*Query:

<pre>
<code>
-- lấy danh sách các sinh viên đang học môn "CSE3034" và tham gia vào học phần số 1
SELECT s.student_id, s.student_name
FROM Students s
INNER JOIN ComponentStudents cs ON s.student_id = cs.student_id
WHERE cs.course_id = 2 AND cs.component_id = 1;
</code>
</pre>

<pre>
<code>
-- Thêm dữ liệu vào bảng Attendance
INSERT INTO Attendance (attendance_id, course_id, component_id, student_id, attendance_date)
VALUES 
(1, 1, 1, 1, '2024-05-10'),
(2, 1, 1, 2, '2024-05-10'),
(3, 2, 1, 1, '2024-05-10');
</code>
</pre>

<pre>
<code>
-- lấy thông tin ai đã điểm danh
SELECT a.student_id, s.student_name
FROM Attendance a
JOIN Students s ON a.student_id = s.student_id
WHERE a.component_id = 1 -- Chọn học phần số 1
AND a.course_id = 2; -- Chọn môn học số 1
</code>
</pre>
