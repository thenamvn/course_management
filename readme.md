![image](https://github.com/thenamvn/course_management/assets/57611937/1a003a62-095b-47f5-881a-9284e3beec3b)


![image](https://github.com/thenamvn/course_management/assets/57611937/16db4df6-d1e8-4b5c-918c-4218d26fe137)


Cơ sở dữ liệu SQL để quản lý sinh viên, bao gồm các khóa học, thành phần khóa học, danh sách sinh viên cho từng thành phần khóa học và hồ sơ điểm danh.

Thông tin đăng nhập server sql ở file: .env

Website thực hiện gửi api về server.Máy chủ sẽ thực hiện các lệnh để lấy dữ liệu từ server sql rồi trả lại client.

Cách chạy:
-Có thể sử dụng extension trên Vscode để chạy wweb do web thuần html,js.![image](https://github.com/thenamvn/course_management/assets/57611937/456eb7c9-f6dc-4758-913a-381caabf9bd5)


-Thực hiện chạy server.js. (node server.js)

*Lưu ý: Cần node.js

Video Demo:

https://github.com/thenamvn/course_management/assets/57611937/15e93330-c4b1-462e-b5db-256a0e1c69a6

File máy chủ: server.js ( chứa các lệnh sql xử lí để lọc và lấy dữ liệu mà client yêu cầu)

Full datacode : database.sql

Cấu hình cơ sở dữ liệu (structure.sql):
<pre>
<code>
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL
);

CREATE TABLE CourseComponents (
    component_id INT NOT NULL,
    course_id INT NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    course_credit INT NOT NULL,
    PRIMARY KEY (component_id, course_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_year INT NOT NULL
);

CREATE TABLE ComponentStudents (
    component_id INT,
    student_id INT,
    course_id INT,
    PRIMARY KEY (component_id, student_id, course_id),
    UNIQUE KEY (course_id, student_id),
    FOREIGN KEY (component_id) REFERENCES CourseComponents(component_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
	INDEX idx_componentstudents (course_id, component_id, student_id)
);
CREATE TABLE Attendance (
    course_id INT NOT NULL,
    component_id INT NOT NULL,
    student_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    PRIMARY KEY (course_id, component_id, student_id, attendance_date),
    FOREIGN KEY (course_id, component_id, student_id) REFERENCES ComponentStudents(course_id, component_id, student_id)
);

CREATE TABLE StudentGrades (
    course_id INT NOT NULL,
    component_id INT NOT NULL,
    student_id INT NOT NULL,
    regular_score DECIMAL(4,2),
    midterm_score DECIMAL(4,2),
    final_score DECIMAL(4,2),
    PRIMARY KEY (course_id, component_id, student_id),
    FOREIGN KEY (course_id, component_id, student_id) REFERENCES ComponentStudents(course_id, component_id, student_id)
);

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) not null
);

</code>
</pre>
Query for example data:
<pre>
<code>
-- Tạo tài khoản người dùng admin ( đây sẽ là tài khoản của giáo viên)
INSERT INTO users (username, password, fullname) VALUES ('admin', 'admin', 'Administrator');

-- Danh sách tổng toàn bộ các sinh viên
INSERT INTO students (student_id, student_name, student_year) VALUES 
(1, 'Penny Tytcomb', 2009),
(2, 'Jae Rean', 1972),
(3, 'Alfons Sango', 2000),
(4, 'Murial Ponting', 2011),
(5, 'Reagan Pail', 2010),
(6, 'Donnie Skaife d''Ingerthorpe', 2003),
(7, 'Marla Rosiello', 1986),
(8, 'Casper Bewick', 2004),
(9, 'Evey Kineton', 1996),
(10, 'Binni Callard', 1995),
(11, 'Dagny Schottli', 1997),
(12, 'Verina Arstingall', 2005),
(13, 'Levin Wreath', 2006),
(14, 'Kalinda O''Hara', 2000),
(15, 'Gleda Sands', 1999),
(16, 'Phedra Brandenburg', 1994),
(17, 'Fernandina Sowood', 1997),
(18, 'Pierrette Litterick', 2011),
(19, 'Stanly Seebright', 1955),
(20, 'Yolanthe Kellitt', 1993),
(21, 'Tonya Orhtmann', 2006),
(22, 'Witty Ubsdall', 2007),
(23, 'Jammal O''Donegan', 2007),
(24, 'Marnia Devereux', 1997),
(25, 'Flint Atack', 2008),
(26, 'Gabrielle Sagg', 2009),
(27, 'Haskel Cumpton', 2007),
(28, 'Harrie Philipot', 2008),
(29, 'Sherman Merali', 1984),
(30, 'Richard McCadden', 2006),
(31, 'Devi Manns', 1993),
(32, 'Cortney Emm', 1999),
(33, 'Gray Nathan', 2001),
(34, 'Lori Haslock', 1988),
(35, 'Jane Bursnall', 2006),
(36, 'Adam Jenken', 2012),
(37, 'Hi Lowe', 2008),
(38, 'Ario Scay', 2011),
(39, 'Brnaby Tidy', 2004),
(40, 'Elisabet Freckleton', 2011);

-- Tạo các môn học
INSERT INTO Courses (course_id, course_name) VALUES 
(1, 'Nguyên lí hệ điều hành'),
(2, 'Lịch sử Đảng');

-- Thêm tài khoản admin vào học môn có id là 1 ( tức nghĩa là giáo viên admin sẽ dạy môn có id 1.web dùng để chỉ cho giáo viên truy cập dữ liệu môn học mà giáo viên đó dạy)
INSERT INTO UserCourses (user_id, course_id) VALUES ('admin', 1);

-- Tạo các học phần cho môn học
INSERT INTO CourseComponents (course_id, component_id, component_name, course_credit) VALUES 
(1, 1, 'Nguyên lí hp1', 2),
(1, 2, 'Nguyên lí hp2', 2),
(1, 3, 'Nguyên lí hp3', 2),
(2, 1, 'LS Đảng hp1', 2),
(2, 2, 'LS Đảng hp2', 2),
(2, 3, 'LS Đảng hp3', 2);

-- Thêm sinh viên vào học phần 1 của môn có id là 1
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES 
(1, 1, 1), (1, 1, 2), (1, 1, 3), (1, 1, 4), (1, 1, 5),
(1, 1, 6), (1, 1, 7), (1, 1, 8), (1, 1, 9), (1, 1, 10),
(1, 1, 11), (1, 1, 12), (1, 1, 13), (1, 1, 14), (1, 1, 15),
(1, 1, 16), (1, 1, 17), (1, 1, 18), (1, 1, 19), (1, 1, 20),
(1, 1, 21), (1, 1, 22), (1, 1, 23), (1, 1, 24), (1, 1, 25),
(1, 1, 26), (1, 1, 27), (1, 1, 28), (1, 1, 29), (1, 1, 30),
(1, 1, 31), (1, 1, 32), (1, 1, 33), (1, 1, 34), (1, 1, 35),
(1, 1, 36), (1, 1, 37), (1, 1, 38), (1, 1, 39), (1, 1, 40);

-- Thêm điểm cho sinh viên
INSERT INTO StudentGrades (course_id, component_id, student_id, regular_score, midterm_score, final_score) VALUES 
(1, 1, 1, 10, 8, 9.75);

</code>
</pre>

Drop Query:
<pre>
<code>
DROP TABLE IF EXISTS `webdatabase`.`componentstudents`, `webdatabase`.`courses`, `webdatabase`.`coursecomponents`, `webdatabase`.`attendance`, `webdatabase`.`students`;
</code>
</pre>
