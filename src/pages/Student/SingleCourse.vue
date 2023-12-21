<script setup lang="ts">
import FooterComponent from '@/components/UserFooter.vue'
import { useUserStore } from '../../stores/user';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

const userStore = useUserStore()
const sortedMeta = ref(userStore.get_student_course_sorted_meta(Number(route.params.id)))
</script>



<template>
    <header class="h-[96px] z-10 fixed top-0 left-0 w-screen bg-theme-pearl flex items-center justify-center text-center">
        <p @click="" class="text-2xl font-xl">Курс: {{
            userStore.students_courses[Number($route.params.id)].course.Tittle_Course }}</p>
    </header>

    <main class="mt-[64px] mb-16 p-16 h-[calc(100vh-160px)]">
        <div v-if="userStore?.students_courses && sortedMeta.length > 0" class="flex flex-col">
            <div v-for="(item, index) in sortedMeta"
                :key="Object.values(item)[0].toString()">
                <RouterLink v-if="Object.keys(item)[0].includes('Lection')"
                :to="{ path: `/student/lection/${index}`, query: { courseIndex: Number($route.params.id) } }"
                    :class='["duration-150 hover:opacity-100 hover:scale-105 bg-theme-khaki h-[96px] opacity-80 cursor-pointer my-2 px-8 font-semibold text-2xl rounded-xl flex items-center justify-around"]'>
                    <p class="w-full overflow-hidden text-ellipsis">{{ item.Tittle_Lection }}
                    </p>
                    <p class="text-base italic font-normal opacity-40">лекция</p>
                </RouterLink>
                <RouterLink v-else
                    :to="{ path: `/student/test/${index}`, query: { courseIndex: Number($route.params.id) } }"
                    :class='["duration-150 hover:opacity-100 hover:scale-105 bg-theme-red h-[96px] opacity-80 cursor-pointer my-2 px-8 font-semibold text-2xl rounded-xl flex items-center justify-around"]'>
                    <p class="w-full overflow-hidden text-ellipsis">{{ item.Tittle_test }}
                    </p>
                    <p class="text-base italic font-normal opacity-40">тест</p>
                </RouterLink>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center w-full h-full" v-else>
            <p class="text-[96px] animate-bounce">😔</p>
            <p class="text-4xl font-semibold text-center">К сожалению, преподаватель ещё не добавил лекций или тестов.</p>
        </div>
    </main>

    <FooterComponent />
</template>