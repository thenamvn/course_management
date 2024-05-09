-- Courses (tạo 1 môn học có tên là cse3033 với id 1)
INSERT INTO Courses (course_id, course_name) VALUES (2, 'lịch sử đảng');

-- CourseComponents (tạo ra các học phần 1,2,3 cho môn có course_id 1)
INSERT INTO CourseComponents (component_id, course_id, component_name) VALUES
(1, 2, 'Học phần 1'),
(2, 2, 'Học phần 2'),
(3, 2, 'Học phần 3');

 -- thêm sv có id là 10 vô ComponentStudents 1
insert into ComponentStudents (component_id, student_id) VALUES (1, 10);