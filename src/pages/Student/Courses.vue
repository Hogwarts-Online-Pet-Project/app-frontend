<script setup lang="ts">
import FooterComponent from '@/components/UserFooter.vue'
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const theme_color_items = [
    "bg-theme-red",
    "bg-theme-purple",
    "bg-theme-yellow",
    "bg-theme-khaki",
]

const get_random_color = () => {
    return theme_color_items[Math.floor(Math.random() * theme_color_items.length)];
}

const userStore = useUserStore()

onMounted(async () => {
    await userStore.student_get_courses()
})
</script>


<template>
    <header class="h-[96px] z-10 fixed top-0 left-0 w-screen bg-theme-pearl flex items-center justify-center text-center">
        <p class="text-2xl font-xl">Курсы</p>
    </header>

    <main class="mt-[48px] mb-16 p-16 min-h-screen">
        <div class="grid grid-cols-3 gap-4">
            <RouterLink v-if="userStore?.students_courses?.length > 0" v-for="(course, courseIndex) in userStore.students_courses"
                :to="`/student/course/${courseIndex}`">
                <div :key="course.courseId"
                    :class='[get_random_color(), `duration-150 hover:opacity-100 hover:scale-105`, "h-[160px] opacity-80 cursor-pointer text-center  px-8 font-semibold text-2xl rounded-xl flex items-center justify-center"]'>
                    <p class="w-full overflow-hidden text-ellipsis">{{ course.course.Tittle_Course }}
                    </p>
                </div>
            </RouterLink>
        </div>
    </main>

    <FooterComponent />
</template>