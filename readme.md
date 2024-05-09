I want to build an SQL database for student management, including courses, course components, student lists for each course component, and attendance records. Example schema for database:
<pre>
<code>
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
</code>
</pre>
Query to select all students in a specific course component:

<pre>
<code>
SELECT s.student_id, s.student_name
FROM Students s
JOIN ComponentStudents cs ON s.student_id = cs.student_id
JOIN CourseComponents cc ON cs.component_id = cc.component_id
WHERE cc.component_id = <component_id>;
</code>
</pre>

![image](https://github.com/thenamvn/WebDatabase/assets/57611937/0e184772-4fc2-4192-afd2-e82a048934e2)
![er_1715264734997](https://github.com/thenamvn/WebDatabase/assets/57611937/e9bd6c2f-cb25-480f-bb7d-f6f8f13c9354)