# Thông tin tài khoản giáo viên đảm nhiệm môn học
select * from UserCourses;

#Bảng thông tin user
select * from users;

SELECT * FROM users WHERE username = 'admin';

#Danh sách sinh viên môn 1 học phần 1 ( điểm danh)
SELECT 
    s.student_id,
    s.student_name,
    cs.course_id,
    cs.component_id,
    a.attendance_date,
    CASE WHEN a.attendance_date IS NOT NULL THEN 1 ELSE 0 END AS attended
FROM 
    students s
JOIN 
    componentstudents cs ON s.student_id = cs.student_id
LEFT JOIN 
    Attendance a ON s.student_id = a.student_id 
    AND cs.course_id = a.course_id 
    AND cs.component_id = a.component_id
WHERE 
    cs.course_id = 1
    AND cs.component_id = 1;

# Danh sách điểm số sinh viên theo học phần
SELECT 
      Students.student_id,
      Students.student_name,
      StudentGrades.regular_score,
      StudentGrades.midterm_score,
      StudentGrades.final_score
    FROM 
      Students
    INNER JOIN 
      ComponentStudents ON Students.student_id = ComponentStudents.student_id
    LEFT JOIN 
      StudentGrades ON Students.student_id = StudentGrades.student_id AND ComponentStudents.course_id = StudentGrades.course_id AND ComponentStudents.component_id = StudentGrades.component_id
    WHERE 
      ComponentStudents.course_id = 1 AND ComponentStudents.component_id = 1;
