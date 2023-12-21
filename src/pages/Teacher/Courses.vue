<script setup lang="ts">
import TeacherHeader from '@/components/TeacherHeader.vue';
import FooterComponent from '@/components/UserFooter.vue'
import PlusSignComponent from '@/components/PlusSignComponent.vue'
import CreateCourse from '@/components/Teacher/CreateCourse.vue'

const userStore = useUserStore()

const theme_color_items = [
    "bg-theme-red",
    "bg-theme-purple",
    "bg-theme-yellow",
    "bg-theme-khaki",
]

const get_random_color = () => {
    return theme_color_items[Math.floor(Math.random() * theme_color_items.length)];
}

import { openModal } from "jenesius-vue-modal";
import { useUserStore } from '@/stores/user';

const show_create_course_modal = async () => {
    let modal = await openModal(CreateCourse)
}
</script>


<template>
    <TeacherHeader />

    <main class="flex flex-col items-center justify-center min-h-screen text-white">
        <div class="flex items-center w-screen overflow-x-scroll scrollbar-hide horizontal_container">
            <PlusSignComponent @click="show_create_course_modal" />
            <!-- <RouterLink v-for="item in card_items" :key="item" to="/teacher/course/1"> -->
            <div v-for="(course, index) in userStore?.teacher_profile?.Courses" :key="course.ID_Course" to="/teacher/course/1">
                <div
                    :class='[get_random_color(), `duration-150 hover:opacity-100 mx-8`, "h-[150px] w-[500px] opacity-80 cursor-pointer text-center  px-8 font-semibold text-2xl rounded-xl flex items-center justify-center"]'>
                    <p class="w-full overflow-hidden text-ellipsis">{{ course.Tittle_Course }}
                    </p>
                </div>
            </div>
            <!-- </RouterLink> -->
        </div>
    </main>

    <FooterComponent />
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>