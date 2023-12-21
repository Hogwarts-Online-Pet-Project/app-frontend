// TODO: Split interfaces

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
  ID_User: number;
}

export interface StudentSendAnswersPayload {
  ID_User: number;
  ID_test: number;
  answers: string[]
}

export interface TeacherQuestionPayload {
  Text_Question: string;
  Answer_Question: string;
  teacherId: number;
}
export interface TeachersQuestions {
  ID_Question: number;
  Text_Question: string;
  Answer_Question: string;
  teacherId: number;
}

export interface TeachersCourses {
  ID_Course: number;
  Tittle_Course: string;
  Teacher_Course: number;
}

export interface Contract {
  ID_Contract: number;
  Number_Contract: string;
  Amount_Contract: string;
  Date_start_Contract: string | Date;
  Date_end_Contract: string | Date;
  Contract_File: string;
  organizationId: number;
  userId: number;
}

export interface TeacherCoursePayload {
  Tittle_Course: string;
  Teacher_Course: number;
}

export interface TeachersTests {
  ID_Test: number;
  Tittle_test: string;
  Deadline_test: Date;
  courseId: number;
  teacherId: number;
  questions?: string[];
}
export interface TeacherTestPayload {
  Tittle_test: string;
  Deadline_test: string;
  courseId: number;
  teacherId: number;
  questions: number[];
}

export interface TeacherLectionPayload {
  Tittle_Lection: string;
  Theme_Lection: string;
  Format_Lection: string;
  Text_Lection: string;
  teacherId: number;
  courseId: number;
}
export interface TeachersLections {
  ID_Lection: number;
  Tittle_Lection: string;
  Theme_Lection: string;
  Format_Lection: string;
  Text_Lection: string;
  teacherId: number;
  courseId: number;
}

export interface TeachersResults {
  ID_Passed_Test: number;
  Score_Passed_Test: string;
  User_Passed_Test: number;
  Test_Passed_Test: number;
  test_title: string;
  student_name: string;
}

export interface TeachersProfile {
  Courses: TeachersCourses[];
  Questions: TeachersQuestions[];
  Tests: TeachersTests[];
  Lections: TeachersLections[];
  Results: TeachersResults[];
}

export interface StudentCourseLection {
  ID_Lection: number;
  Tittle_Lection: string;
  Theme_Lection: string;
  Format_Lection: string;
  Lection_Course: number;
}

export interface StudentCourseTestQuestionQuestion {
  ID_Question: number;
  Text_Question: string;
  teacherId: number;
}
export interface StudentCourseTestQuestion {
  id: number;
  testId: number;
  questionId: number;
  questions: StudentCourseTestQuestionQuestion[];
}

export interface StudentCourseTest {
  ID_Lection: number;
  Tittle_Lection: string;
  Theme_Lection: string;
  Format_Lection: string;
  Lection_Course: number;
  test_question: StudentCourseTestQuestion[];
}

export interface StudentsCourses {
  id: number;
  studentId: number;
  courseId: number;
  course: {
    ID_Course: number;
    Tittle_Course: string;
    Teacher_Course: number;
  },
  lections: StudentCourseLection[];
  tests: StudentCourseTest[];
}

export interface UserProfile {
  ID_User: number;
  Last_name_User: string;
  First_name_User: string;
  Middle_name_User: string;
  Email_User: string;
  Role_user_User: number;
  Date_of_birth: string | Date;
  Sex_User: string;
  contract: Contract;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}