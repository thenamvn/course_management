-- lấy danh sách các sinh viên đang học môn 
SELECT s.student_id, s.student_name, s.student_year
FROM Students s
INNER JOIN ComponentStudents cs ON s.student_id = cs.student_id
WHERE cs.course_id = 1 AND cs.component_id = 1;


-- Thêm dữ liệu vào bảng Attendance
INSERT INTO Attendance (course_id, component_id, student_id, attendance_date)
VALUES 
(1, 1, 1, '2024-05-10'),
(1, 1, 2, '2024-05-10'),
(2, 1, 1, '2024-05-10');

-- lấy thông tin ai đã điểm danh
SELECT
    s.student_name,
    s.student_id,
    a.attendance_date
FROM
    Attendance a
    JOIN ComponentStudents cs ON a.component_id = cs.component_id AND a.course_id = cs.course_id AND a.student_id = cs.student_id
    JOIN Students s ON cs.student_id = s.student_id
WHERE
    a.course_id = 2
    AND a.component_id = 1;
