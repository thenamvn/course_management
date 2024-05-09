-- tạo tự động học phần chứa sinh viên từ Student
SELECT CONCAT('INSERT INTO ComponentStudents (course_id, component_id, student_id) VALUES (1, 1, ', student_id, ');')
FROM students;