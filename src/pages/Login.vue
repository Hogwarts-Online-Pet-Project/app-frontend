<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user';
import { toast } from 'vue3-toastify';
import axios from '@/utils/axios'


const userStore = useUserStore()

const router = useRouter()
const login = ref("")
const password = ref("")

onMounted(async () => {

})

const submit_login = async () => {
    await userStore.user_login(login.value, password.value)
}
</script>

<template>
    <main class="flex flex-col items-center justify-center w-screen h-screen">
        <img src="../assets/logo.png" class="w-32 h-32 animate-pulse" alt="">
        <form class="flex flex-col w-3/4 max-w-[800px] mt-8" @submit.prevent="submit_login">
            <input v-model="login"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Логин" type="text" name="login" autocomplete="username" required>
            <input v-model="password"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Пароль" type="password" autocomplete="current-password" name="password" required>
            <input type="submit"
                class="h-16 px-8 mx-auto my-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-khaki w-fit rounded-xl hover:bg-theme-red hover:px-16"
                value="Войти">
        </form>
    </main>
</template>
