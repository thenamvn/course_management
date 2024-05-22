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
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL
);
-- Bảng UserCourses để liên kết người dùng với các khóa học
CREATE TABLE UserCourses (
    user_id VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES Users(username),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);