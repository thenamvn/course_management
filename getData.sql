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
(2, 1, 1, '2024-05-10'),
(1, 1, 3, '2024-05-15');

-- lấy thông tin ai đã điểm danh
SELECT
    s.student_name,
    s.student_id,
    s.student_year,
    a.attendance_date
FROM
    Attendance a
    JOIN Students s ON a.student_id = s.student_id -- Thêm liên kết với bảng Students
WHERE
    a.course_id = 2
    AND a.component_id = 1;


