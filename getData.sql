-- lấy danh sách các sinh viên đang học môn "CSE3034" và tham gia vào học phần số 1
SELECT s.student_id, s.student_name
FROM Students s
INNER JOIN ComponentStudents cs ON s.student_id = cs.student_id
WHERE cs.course_id = 2 AND cs.component_id = 1;

-- Thêm dữ liệu vào bảng Attendance
INSERT INTO Attendance (course_id, component_id, student_id, attendance_date)
VALUES 
(1, 1, 1, '2024-05-10'),
(1, 1, 2, '2024-05-10'),
(2, 1, 1, '2024-05-10');

-- lấy thông tin ai đã điểm danh
SELECT a.student_id, s.student_name
FROM Attendance a
JOIN Students s ON a.student_id = s.student_id
WHERE a.component_id = 1 -- Chọn học phần số 1
AND a.course_id = 1; -- Chọn môn học số 1
