<script setup lang="ts">
import FooterComponent from '@/components/UserFooter.vue'
import { useUserStore } from '../../stores/user';
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const route = useRoute()

const lection_selector = userStore.get_student_course_sorted_meta(Number(route.query?.courseIndex))[Number(route.params.id)]


onMounted(() => {
})

</script>


<template>
    <header class="h-[96px] z-10 fixed top-0 left-0 w-screen bg-theme-pearl flex items-center justify-center text-center">
        <p class="text-2xl font-xl">Лекция: {{ lection_selector.Tittle_Lection || `Данное поле не заполнено. Обратитесь к
            администратору или преподавателю.` }}</p>
    </header>

    <main class="w-screen h-screen px-8 py-32">
        <div class="flex w-full h-full group">
            <div
                class="left w-2/3 max-w-[320px] bg-theme-khaki rounded-tl-2xl rounded-bl-2xl font-semibold text-lg flex items-center justify-center flex-col">
                <p>Формат: {{ lection_selector.Format_Lection || `Данное поле не заполнено. Обратитесь к администратору или
                    преподавателю.` }}</p>
                <p>Тема: {{ lection_selector.Theme_Lection || `Данное поле не заполнено. Обратитесь к администратору или
                    преподавателю.` }}</p>
            </div>
            <div class="flex-1 px-16 py-8 overflow-y-scroll text-lg bg-theme-red rounded-tr-2xl rounded-br-2xl">
                <p>{{ lection_selector.Text_Lection || `Данное поле не заполнено. Обратитесь к администратору или
                    преподавателю.` }}</p>
            </div>
        </div>
    </main>

    <FooterComponent />
</template>

<style scoped></style>