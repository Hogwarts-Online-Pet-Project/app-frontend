import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/Login.vue'
import StudentCourses from '../pages/Student/Courses.vue'
import SingleCourse from '../pages/Student/SingleCourse.vue'
import SingleLection from '../pages/Student/SingleLection.vue'
import SingleTest from '../pages/Student/SingleTest.vue'
import StudentProfile from '../pages/Student/Profile.vue'
import TeacherProfile from '../pages/Teacher/Profile.vue'
import TeacherCourses from '../pages/Teacher/Courses.vue'
import TeacherTests from '../pages/Teacher/Tests.vue'
import TeacherQuestions from '../pages/Teacher/Questions.vue'
import TeacherLections from '../pages/Teacher/Lections.vue'
import TeacherResults from '../pages/Teacher/Results.vue'
import { useUserStore } from '@/stores/user'
import { toast } from 'vue3-toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => {
        const userStore = useUserStore()
        userStore.user_logout()
      }
    },
    {
      path: '/student',
      name: 'student',
      children: [
        {
          path: 'courses',
          name: 'student_courses',
          component: StudentCourses
        },
        {
          path: 'course/:id',
          name: 'single_course',
          component: SingleCourse
        },
        {
          path: 'lection/:id',
          name: 'single_lection',
          component: SingleLection
        },
        {
          path: 'test/:id',
          name: 'single_test',
          component: SingleTest
        },
        {
          path: 'profile',
          name: 'student_profile',
          component: StudentProfile
        },
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      children: [
        {
          path: 'courses',
          name: 'teacher_courses',
          component: TeacherCourses
        },
        {
          path: 'tests',
          name: 'teacher_tests',
          component: TeacherTests
        },
        {
          path: 'lections',
          name: 'teacher_lections',
          component: TeacherLections
        },
        {
          path: 'questions',
          name: 'teacher_questions',
          component: TeacherQuestions
        },
        {
          path: 'profile',
          name: 'teacher_profile',
          component: TeacherProfile
        },
        {
          path: 'results',
          name: 'teacher_results',
          component: TeacherResults
        }
      ]
    },
  ]
})

// TODO: Better navigation guard
router.beforeEach(async (to, from, next) => {
  try {
    const userStore = useUserStore()
    userStore.load_state()

    if (to.name.toString().includes('logout')) {
      await userStore.user_logout();
    }
    if (to.name.toString().includes('login')) {

      // Check LocalStorage or continue
      if (userStore?.profile !== null) {
        await userStore.user_get_profile()
      }
      next()
    } else {
      if (to.name.toString().includes('student')) {
        if (userStore.profile?.Role_user_User !== 1) { userStore.clear_state(); next({ name: "login" }) }
        else { next() }
      } else if (to.name.toString().includes('teacher')) {
        if (userStore.profile?.Role_user_User !== 2) { userStore.clear_state(); next({ name: "login" }) }
        else { next(); await userStore.teacher_get_profile(); }
      } else if (to.name.toString().includes('admin')) {
        if (userStore.profile?.Role_user_User !== 3) { userStore.clear_state(); next({ name: "login" }) }
        else { next() }
      }
      else { next() }
    }
  } catch (error) {
    // next({ name: "login" })
  }
})

export default router
