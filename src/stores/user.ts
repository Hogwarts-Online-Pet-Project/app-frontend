import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import axios from '../utils/axios'
import router from '../router';
import { ChangePasswordPayload, StudentSendAnswersPayload, StudentsCourses, TeacherCoursePayload, TeacherLectionPayload, TeacherQuestionPayload, TeacherTestPayload, TeachersProfile, UserProfile, UserToken } from './user-interfaces';


export const useUserStore = defineStore('user', () => {
  const profile = ref<null | UserProfile>(null)
  const token = ref<null | UserToken>(null);
  const students_courses = ref<null | StudentsCourses>(null)
  const teacher_profile = ref<null | TeachersProfile>(null)

  const get_token = computed(() => {
    return token.value || null
  })

  const user_full_name = computed(() => {
    return `${profile.value?.Last_name_User} ${profile.value?.First_name_User} ${profile.value?.Middle_name_User}`.trim() || null
  })

  async function user_login(login: string, password: string) {
    let response = await axios.post('/auth/login', { Email_User: login, Password_User: password })
    if (!response) { return }
    axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.accessToken
    token.value = response.data
    await user_get_profile()
  }

  async function user_change_password(payload: ChangePasswordPayload) {
    let response = await axios.post('/users/change_password', payload)
    if (!response) { return }
    setTimeout(() => {
      toast.success("Вы успешно смениил пароль")
    }, 300)
    clear_state()
  }

  function user_logout() {
    clear_state()
  }

  async function user_get_profile() {
    let response = await axios.get('/users/profile')
    if (!response) {
      clear_state()
      return
    }
    profile.value = response.data
    switch (profile.value.Role_user_User) {
      case 1:
        router.push("/student/courses")
        setTimeout(() => { toast.success(`Добро пожаловать, ${user_full_name.value}`) }, 300)
        break;
      case 2:
        await teacher_get_profile()
        router.push("/teacher/courses")
        setTimeout(() => { toast.success(`Добро пожаловать, ${user_full_name.value}`) }, 300)
        break;
      case 3:
        router.push("/admin/tables")
        setTimeout(() => { toast.success(`Добро пожаловать, ${user_full_name.value}`) }, 300)
        break;
      default:
        router.push("/")
        setTimeout(() => { toast.error("Произошла ошибка, обратитесь к администратору") }, 300)
        break;

    }
  }

  async function teacher_get_profile() {
    // console.log("TEACHER_PROFILE: " + axios.defaults.headers.common['Authorization']);
    let response = await axios.get('/users/teacher_profile', { params: { ID_User: profile.value.ID_User } })
    if (!response) {
      return
    }
    teacher_profile.value = response.data
  }

  async function teacher_create_course(payload: TeacherCoursePayload) {
    let response = await axios.post('/crud/course/', payload)
    if (!response) {
      return
    }
    if (!response?.data?.ID_Course) {
      setTimeout(() => {
        toast.success("Неожиданный ответ, обратитесь к администратору.")
        console.log(response.data);
      }, 300)
    }
    await teacher_get_profile()
    setTimeout(() => {
      toast.success(`Курс "${payload.Tittle_Course}" успешно создан`)
    }, 300)
  }

  async function teacher_create_question(payload: TeacherQuestionPayload) {
    let response = await axios.post('/crud/questions/', payload)
    if (!response) {
      return
    }
    if (!response?.data?.ID_Question) {
      setTimeout(() => {
        toast.success("Неожиданный ответ, обратитесь к администратору.")
        console.log(response.data);
      }, 300)
    }
    await teacher_get_profile()
    setTimeout(() => {
      toast.success(`Вопрос "${payload.Text_Question}" успешно создан`)
    }, 300)
  }

  async function teacher_create_test(payload: TeacherTestPayload) {
    let response = await axios.post('/users/teacher_test', payload)
    if (!response) {
      return
    }
    if (!response?.data?.test?.ID_Test) {
      setTimeout(() => {
        toast.success("Неожиданный ответ, обратитесь к администратору.")
        console.log(response.data);
      }, 300)
    }
    await teacher_get_profile()
    setTimeout(() => {
      toast.success(`Тест "${payload.Tittle_test}" успешно создан`)
    }, 300)
  }

  async function teacher_create_lection(payload: TeacherLectionPayload) {
    let response = await axios.post('/users/teacher_lection', payload)
    if (!response) {
      return
    }
    if (!response?.data?.ID_Lection) {
      setTimeout(() => {
        toast.success("Неожиданный ответ, обратитесь к администратору.")
        console.log(response.data);
      }, 300)
    }
    await teacher_get_profile()
    setTimeout(() => {
      toast.success(`Лекция "${payload.Tittle_Lection}" успешно создана`)
    }, 300)
  }

  async function teacher_import_questions(payload: FormData) {
    let response = await axios.post("/users/teacher_import_questions", payload)
    if (!response.data?.message) {
      setTimeout(() => {
        toast.error("Неожиданная ошибка при импорте, обратитесь к администратору.")
      }, 300);
      return
    }
    await teacher_get_profile()
    setTimeout(() => {
      toast.success(response.data.message)
    }, 300);
  }

  async function teacher_export_questions() {
    let response = await axios.get("/users/teacher_export_questions")
    if (!response) {
      return
    }
    let blob = new Blob([response.data], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob)
    window.open(url)
  }

  async function student_send_answers(payload: StudentSendAnswersPayload) {
    let response = await axios.post('/users/student_answer', payload)
    if (!response) {
      return
    }
    if (response.data.Score_Passed_Test) {
      router.push('/student/courses')
      setTimeout(() => { toast.success(`Вы набрали ${response.data.Score_Passed_Test} балл(а/ов)`, { autoClose: false }) }, 300)
    } else {
      setTimeout(() => {
        toast.error('Произошла ошибка, обратитесь к администратору.'); console.log(response);
      }, 300)
    }

  }

  async function student_get_courses() {
    let response = await axios.get('/users/student_courses', { params: { ID_User: profile.value.ID_User } })
    if (!response) {
      return
    }
    students_courses.value = response.data
  }

  function get_student_course_sorted_meta(courseIndex: number) {
    return [...students_courses.value[courseIndex].lections, ...students_courses.value[courseIndex].tests].toSorted((a, b) => Number(Object.values(a)[0]) - Number(Object.values(b)[0]))
  }

  function load_state() {
    try {
      let snapshot = JSON.parse(localStorage.getItem('userStore'))
      profile.value = snapshot.profile
      token.value = snapshot.token
      students_courses.value = snapshot.students_courses
      teacher_profile.value = snapshot.teacher_profile
      axios.defaults.headers.common['Authorization'] = "Bearer " + token.value.accessToken
      // console.log("LOAD STATE: " + axios.defaults.headers.common['Authorization']);

    } catch (error) {
      // clear_state()
    }
  }

  function clear_state() {
    profile.value = null
    token.value = null
    students_courses.value = null
    teacher_profile.value = null
    localStorage.removeItem('userStore')
    router.push("/")
    setTimeout(() => { toast.info("Вы вышли из системы") }, 300)
  }

  return {
    student_get_courses,
    user_login,
    user_logout,
    load_state,
    user_get_profile,
    clear_state,
    get_student_course_sorted_meta,
    user_change_password,
    student_send_answers,
    teacher_get_profile,
    teacher_create_course,
    teacher_create_question,
    teacher_create_test,
    teacher_create_lection,
    teacher_export_questions,
    teacher_import_questions,
    user_full_name,
    teacher_profile,
    get_token,
    profile,
    token,
    students_courses,
  }

})