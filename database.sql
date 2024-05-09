CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
);

CREATE TABLE CourseComponents (
    component_id INT PRIMARY KEY,
    course_id INT,
    component_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL
);

CREATE TABLE ComponentStudents (
    component_id INT,
    student_id INT,
    PRIMARY KEY (component_id, student_id),
    FOREIGN KEY (component_id) REFERENCES CourseComponents(component_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY,
    component_id INT,
    student_id INT,
    attendance_date DATE NOT NULL,
    FOREIGN KEY (component_id) REFERENCES CourseComponents(component_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

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


Select * from students;

-- Courses (tạo 1 môn học có tên là cse3033 với id 1)
INSERT INTO Courses (course_id, course_name) VALUES (1, 'CSE3033');

-- CourseComponents (tạo ra các học phần 1,2,3 cho môn có course_id 1)
INSERT INTO CourseComponents (component_id, course_id, component_name) VALUES
(1, 1, 'Học phần 1'),
(2, 1, 'Học phần 2'),
(3, 1, 'Học phần 3');

 -- thêm sv có id là 10 vô ComponentStudents 1
insert into ComponentStudents (component_id, student_id) VALUES (1, 10);
