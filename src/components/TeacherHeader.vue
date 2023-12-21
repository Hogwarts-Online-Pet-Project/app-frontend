<script setup lang="ts">
import { ref } from 'vue'
const menu_items = ref([
    { title: "Курсы", href: "/teacher/courses" },
    { title: "Тесты", href: "/teacher/tests" },
    { title: "Лекции", href: "/teacher/lections" },
    { title: "Вопросы", href: "/teacher/questions" },
    { title: "Результаты", href: "/teacher/results" },
])
</script>

<template>
    <header class="h-[96px] z-10 fixed top-0 left-0 w-screen bg-theme-pearl flex items-center justify-center text-center">
        <ul class="flex text-lg font-semibold items-center justify-around w-full max-w-[800px] h-full">
            <RouterLink v-for="(item, index) in menu_items" :key="item.title" :to="item.href">
                <li
                    :class="[$route.fullPath == item.href ? '!opacity-100 bg-white bg-opacity-10' : '', 'cursor-pointer hover:bg-white hover:bg-opacity-10 hover:scale-105 px-6 py-4 rounded-2xl duration-200 hover:opacity-100 opacity-40']">
                    {{ item.title }}</li>
            </RouterLink>
        </ul>
    </header>
</template>