<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../stores/user';
const userStore = useUserStore()
const title = ref("")

const submit_course = async () => {
    await userStore.teacher_create_course({
        Tittle_Course: title.value,
        Teacher_Course: userStore.profile.ID_User
    })
}
</script>

<template>
    <div class="h-[500px] w-[800px] flex items-center justify-center flex-col bg-theme-khaki rounded-2xl">
        <form class="flex flex-col w-3/4 max-w-[800px] mt-8" @submit.prevent="submit_course">
            <input v-model="title"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Название курса" type="text" name="title" required>
            <input type="submit"
                class="h-16 px-8 mx-auto my-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16"
                value="Создать курс">
        </form>
    </div>
</template>