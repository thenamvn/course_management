-- lấy danh sách các sinh viên đang học môn "CSE3033" và tham gia vào học phần số 1
SELECT s.student_id, s.student_name
FROM Students s
JOIN ComponentStudents cs ON s.student_id = cs.student_id
JOIN CourseComponents cc ON cs.component_id = cc.component_id
JOIN Courses c ON cc.course_id = c.course_id
WHERE c.course_id = 1 -- Đặt mã của khóa học "CSE3033"
AND cc.component_id = 1; -- Đặt mã của học phần số 1

-- lấy danh sách các sinh viên đang học môn "CSE3034" và tham gia vào học phần số 2
SELECT s.student_id, s.student_name
FROM Students s
JOIN ComponentStudents cs ON s.student_id = cs.student_id
JOIN CourseComponents cc ON cs.component_id = cc.component_id
JOIN Courses c ON cc.course_id = c.course_id
WHERE c.course_id = 1 -- Đặt mã của khóa học "CSE3033"
AND cc.component_id = 1; -- Đặt mã của học phần số 1
