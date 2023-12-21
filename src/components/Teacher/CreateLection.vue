<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../stores/user';
const userStore = useUserStore()

const title = ref("")
const theme = ref("")
const format = ref("")
const text = ref("")
const selected_course = ref("default")

const submit_lection = async () => {
    await userStore.teacher_create_lection({
        Tittle_Lection: title.value,
        Theme_Lection: theme.value,
        Format_Lection: format.value,
        Text_Lection: text.value,
        teacherId: Number(userStore?.profile?.ID_User),
        courseId: Number(selected_course.value),
    })
}
</script>

<template>
    <div class="h-[100vh] mt-[256px] w-[800px] flex items-center flex-col bg-theme-khaki rounded-2xl overflow-y-auto">
        <form class="flex flex-col w-3/4 max-w-[800px] mt-16 mb-[128px]" @submit.prevent="submit_lection">
            <input v-model="title"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Заголовок лекции" type="text" name="lection_title" required>

            <input v-model="theme"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Тема лекции" type="text" name="lection_theme" required>

            <input v-model="format"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Формат лекции" type="text" name="lection_format" required>

            <textarea v-model="text"
                class="h-16 pt-4 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Текст лекции" type="text" name="lection_title" required></textarea>


            <select v-model="selected_course"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                required>
                <option value="default" disabled selected>Выберите курс</option>
                <option v-for="select_option in userStore?.teacher_profile?.Courses" :value="select_option.ID_Course">
                    {{ select_option.ID_Course }} - {{ select_option.Tittle_Course }}</option>
            </select>

            <input type="submit"
                class="h-16 px-8 mx-auto my-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16"
                value="Создать">
        </form>
    </div>
</template>