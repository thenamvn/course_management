![image](https://github.com/thenamvn/course_management/assets/57611937/1a003a62-095b-47f5-881a-9284e3beec3b)


![image](https://github.com/thenamvn/course_management/assets/57611937/16db4df6-d1e8-4b5c-918c-4218d26fe137)


Cơ sở dữ liệu SQL để quản lý sinh viên, bao gồm các khóa học, thành phần khóa học, danh sách sinh viên cho từng thành phần khóa học và hồ sơ điểm danh
<pre>
<code>
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
);

CREATE TABLE CourseComponents (
    component_id INT NOT NULL,
    course_id INT NOT NULL,
    component_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (component_id, course_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    student_year VARCHAR(50) NOT NULL
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
    course_id INT NOT NULL,
    component_id INT NOT NULL,
    student_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    PRIMARY KEY (course_id, component_id, student_id, attendance_date),
    FOREIGN KEY (component_id, course_id) REFERENCES CourseComponents(component_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);
</code>
</pre>
Query for example data:
<pre>
<code>
-- Danh sách tổng toàn bộ các sinh viên
INSERT INTO students (student_id, student_name, student_year) 
VALUES 
(1, 'Herman Simons', 2022),
(2, 'Ravid Rouf', 2022),
(3, 'Dukie Boulter', 2022),
(4, 'Kendell Minshall', 2022),
(5, 'Goldi Wallhead', 2022),
(6, 'Iris Roughey', 2022),
(7, 'Wendall Louca', 2022),
(8, 'Jessalin Scrase', 2022),
(9, 'Maud Dolbey', 2022),
(10, 'Ira Nunn', 2022);

-- Courses (tạo 1 môn học có tên là cse3033 với id 1)
INSERT INTO Courses (course_id, course_name) VALUES (1, 'Nguyên lí hệ điều hành');
INSERT INTO Courses (course_id, course_name) VALUES (2, 'Lịch sử Đảng');

-- CourseComponents (tạo ra các học phần 1,2,3 cho môn có course_id 1)
INSERT INTO CourseComponents (course_id, component_id, component_name)
VALUES
    (1, 1, 'Học phần 1'),
    (1, 2, 'Học phần 2'),
    (1, 3, 'Học phần 3'),
    (2, 1, 'Học phần 1'),
    (2, 2, 'Học phần 2'),
    (2, 3, 'Học phần 3');

-- Thêm 5 sinh viên vào môn 1 học phần 1
INSERT INTO ComponentStudents (course_id, component_id, student_id) 
VALUES 
(1, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 1, 5);

-- Thêm 5 sinh viên vào môn 1 học phần 2
INSERT INTO ComponentStudents (course_id, component_id, student_id) 
VALUES 
(1, 2, 6),
(1, 2, 7),
(1, 2, 8),
(1, 2, 9),
(1, 2, 10);

-- Thêm 5 sinh viên vào môn 2 học phần 1
INSERT INTO ComponentStudents (course_id, component_id, student_id) 
VALUES 
(2, 1, 1),
(2, 1, 2),
(2, 1, 3),
(2, 1, 4),
(2, 1, 5);

-- Thêm 5 sinh viên vào môn 2 học phần 2
INSERT INTO ComponentStudents (course_id, component_id, student_id) 
VALUES 
(2, 2, 6),
(2, 2, 7),
(2, 2, 8),
(2, 2, 9),
(2, 2, 10);

-- Thêm dữ liệu vào bảng Attendance
INSERT INTO Attendance (course_id, component_id, student_id, attendance_date)
VALUES 
(1, 1, 1, '2024-05-10'),
(1, 1, 2, '2024-05-10'),
(2, 1, 1, '2024-05-10');
</code>
</pre>

Drop Query:
<pre>
<code>
DROP TABLE IF EXISTS `webdatabase`.`componentstudents`, `webdatabase`.`courses`, `webdatabase`.`coursecomponents`, `webdatabase`.`attendance`, `webdatabase`.`students`;
</code>
</pre>
