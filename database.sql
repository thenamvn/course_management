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
    student_year VARCHAR(4) NOT NULL
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


insert into users (id, username,password,fullname) values (1,'admin','admin','Administrator');
-- Danh sách tổng toàn bộ các sinh viên
insert into students (student_id, student_name, student_year) values (1, 'Penny Tytcomb', 2009);
insert into students (student_id, student_name, student_year) values (2, 'Jae Rean', 1972);
insert into students (student_id, student_name, student_year) values (3, 'Alfons Sango', 2000);
insert into students (student_id, student_name, student_year) values (4, 'Murial Ponting', 2011);
insert into students (student_id, student_name, student_year) values (5, 'Reagan Pail', 2010);
insert into students (student_id, student_name, student_year) values (6, 'Donnie Skaife d''Ingerthorpe', 2003);
insert into students (student_id, student_name, student_year) values (7, 'Marla Rosiello', 1986);
insert into students (student_id, student_name, student_year) values (8, 'Casper Bewick', 2004);
insert into students (student_id, student_name, student_year) values (9, 'Evey Kineton', 1996);
insert into students (student_id, student_name, student_year) values (10, 'Binni Callard', 1995);
insert into students (student_id, student_name, student_year) values (11, 'Dagny Schottli', 1997);
insert into students (student_id, student_name, student_year) values (12, 'Verina Arstingall', 2005);
insert into students (student_id, student_name, student_year) values (13, 'Levin Wreath', 2006);
insert into students (student_id, student_name, student_year) values (14, 'Kalinda O''Hara', 2000);
insert into students (student_id, student_name, student_year) values (15, 'Gleda Sands', 1999);
insert into students (student_id, student_name, student_year) values (16, 'Phedra Brandenburg', 1994);
insert into students (student_id, student_name, student_year) values (17, 'Fernandina Sowood', 1997);
insert into students (student_id, student_name, student_year) values (18, 'Pierrette Litterick', 2011);
insert into students (student_id, student_name, student_year) values (19, 'Stanly Seebright', 1955);
insert into students (student_id, student_name, student_year) values (20, 'Yolanthe Kellitt', 1993);
insert into students (student_id, student_name, student_year) values (21, 'Tonya Orhtmann', 2006);
insert into students (student_id, student_name, student_year) values (22, 'Witty Ubsdall', 2007);
insert into students (student_id, student_name, student_year) values (23, 'Jammal O''Donegan', 2007);
insert into students (student_id, student_name, student_year) values (24, 'Marnia Devereux', 1997);
insert into students (student_id, student_name, student_year) values (25, 'Flint Atack', 2008);
insert into students (student_id, student_name, student_year) values (26, 'Gabrielle Sagg', 2009);
insert into students (student_id, student_name, student_year) values (27, 'Haskel Cumpton', 2007);
insert into students (student_id, student_name, student_year) values (28, 'Harrie Philipot', 2008);
insert into students (student_id, student_name, student_year) values (29, 'Sherman Merali', 1984);
insert into students (student_id, student_name, student_year) values (30, 'Richard McCadden', 2006);
insert into students (student_id, student_name, student_year) values (31, 'Devi Manns', 1993);
insert into students (student_id, student_name, student_year) values (32, 'Cortney Emm', 1999);
insert into students (student_id, student_name, student_year) values (33, 'Gray Nathan', 2001);
insert into students (student_id, student_name, student_year) values (34, 'Lori Haslock', 1988);
insert into students (student_id, student_name, student_year) values (35, 'Jane Bursnall', 2006);
insert into students (student_id, student_name, student_year) values (36, 'Adam Jenken', 2012);
insert into students (student_id, student_name, student_year) values (37, 'Hi Lowe', 2008);
insert into students (student_id, student_name, student_year) values (38, 'Ario Scay', 2011);
insert into students (student_id, student_name, student_year) values (39, 'Brnaby Tidy', 2004);
insert into students (student_id, student_name, student_year) values (40, 'Elisabet Freckleton', 2011);

-- Courses (tạo 1 môn học có tên là cse3033 với id 1)
INSERT INTO Courses (course_id, course_name) VALUES (1, 'Nguyên lí hệ điều hành');
INSERT INTO Courses (course_id, course_name) VALUES (2, 'Lịch sử Đảng');

-- CourseComponents (tạo ra các học phần 1,2,3 cho môn có course_id 1)
INSERT INTO CourseComponents (course_id, component_id, component_name,course_credit)
VALUES
    (1, 1, 'Nguyên lí hp1',2),
    (1, 2, 'Nguyên lí hp2',2),
    (1, 3, 'Nguyên lí hp3',2),
    (2, 1, 'LS Đảng hp1',2),
    (2, 2, 'LS Đảng hp2',2),
    (2, 3, 'LS Đảng hp3',2);
-- thêm sv vô 1-1
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 1);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 2);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 3);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 4);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 5);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 6);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 7);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 8);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 9);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 10);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 11);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 12);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 13);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 14);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 15);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 16);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 17);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 18);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 19);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 20);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 21);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 22);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 23);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 24);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 25);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 26);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 27);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 28);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 29);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 30);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 31);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 32);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 33);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 34);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 35);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 36);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 37);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 38);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 39);
INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, 40);

-- thêm điểm--
insert into StudentGrades (course_id,component_id,student_id,regular_score,midterm_score,final_score) values (1,1,1,10,8,9.75);