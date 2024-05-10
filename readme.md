![image](https://github.com/thenamvn/WebDatabase/assets/57611937/5eae5e74-cdfb-4489-a0bd-cb32ab18c99d)
![image](https://github.com/thenamvn/WebDatabase/assets/57611937/2f6bd914-f49e-4a11-9a1b-ad1766fa1eda)
![image](https://github.com/thenamvn/WebDatabase/assets/57611937/45e0237f-a1e9-43ed-b019-20b3f70d86ce)



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
