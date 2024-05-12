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
  ComponentStudents.course_id = 1 AND ComponentStudents.component_id = 1