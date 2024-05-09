Cơ sở dữ liệu SQL để quản lý sinh viên, bao gồm các khóa học, thành phần khóa học, danh sách sinh viên cho từng thành phần khóa học và hồ sơ điểm danh
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
-- danh sách tổng toàn bộ các sinh viên
insert into students (student_id, student_name) values (1, 'Herman Simons');
insert into students (student_id, student_name) values (2, 'Ravid Rouf');
insert into students (student_id, student_name) values (3, 'Dukie Boulter');
insert into students (student_id, student_name) values (4, 'Kendell Minshall');
insert into students (student_id, student_name) values (5, 'Goldi Wallhead');
insert into students (student_id, student_name) values (6, 'Iris Roughey');
insert into students (student_id, student_name) values (7, 'Wendall Louca');
insert into students (student_id, student_name) values (8, 'Jessalin Scrase');
insert into students (student_id, student_name) values (9, 'Maud Dolbey');
insert into students (student_id, student_name) values (10, 'Ira Nunn');

-- Courses (tạo 1 môn học có tên là cse3033 với id 1)
INSERT INTO Courses (course_id, course_name) VALUES (1, 'Mạch logic');
INSERT INTO Courses (course_id, course_name) VALUES (2, 'Lịch sử Đảng');

-- CourseComponents (tạo ra các học phần 1,2,3 cho môn có course_id 1)
INSERT INTO CourseComponents (course_id, component_sequence, component_name)
VALUES
    (1, 1, 'Học phần 1 khóa học 1'),
    (1, 2, 'Học phần 2 khóa học 1'),
    (1, 3, 'Học phần 3 khóa học 1'),
    (2, 1, 'Học phần 1 khóa học 2'),
    (2, 2, 'Học phần 2 khóa học 2'),
    (2, 3, 'Học phần 3 khóa học 2');

 -- thêm 5 sv vô môn 1 học phần 1
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 1);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 2);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 3);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 4);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 5);
-- 5 sv vô hp 2
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 2, 6);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 2, 7);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 2, 8);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 2, 9);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 2, 10);

 -- thêm 5 sv vô môn 2 học phần 1
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 1, 1);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 1, 2);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 1, 3);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 1, 4);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 1, 5);

-- 5 sv môn 2 hp2
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 2, 6);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 2, 7);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 2, 8);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 2, 9);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (2, 2, 10);
</code>
</pre>

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
