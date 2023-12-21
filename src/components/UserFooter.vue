<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

</script>


<template>
    <footer class="h-[96px] fixed bottom-0 left-0 w-screen bg-theme-pearl flex items-center justify-center text-center">
        <div
            class="relative flex items-center justify-center py-2 pl-4 pr-8 duration-200 ease-in-out cursor-pointer rounded-br-xl rounded-bl-xl group userbar hover:bg-theme-khaki">
            <div class="w-16 overflow-hidden rounded-full avatar">
                <img class="w-full h-full"
                    src="https://cdn0.iconfinder.com/data/icons/game-elements-2/64/mage-avatar-mystery-user-magician-512.png"
                    alt="">
            </div>
            <ul
                class="absolute top-0 left-0 z-10 flex flex-col items-center justify-center min-w-full duration-200 -translate-y-full opacity-0 rounded-tl-xl rounded-tr-xl group-hover:opacity-100 group-hover:block bg-theme-red">
                <RouterLink :to="userStore?.profile?.Role_user_User == 1 ? '/student/courses' : '/teacher/courses'">
                    <li
                        class="px-2 py-4 text-lg font-semibold duration-300 hover:bg-white hover:text-black opacity-60 hover:opacity-100">
                        Курсы
                    </li>
                </RouterLink>
                <RouterLink :to="userStore?.profile?.Role_user_User == 1 ? '/student/profile' : '/teacher/profile'">
                    <li
                        class="px-2 py-4 text-lg font-semibold duration-300 hover:bg-white hover:text-black opacity-60 hover:opacity-100">
                        Профиль
                    </li>
                </RouterLink>
                <li @click="userStore.user_logout()"
                    class="px-2 py-4 text-lg font-semibold duration-300 hover:bg-white hover:text-black opacity-60 hover:opacity-100">
                    Выйти
                </li>
            </ul>

            <p class="ml-4 text-lg font-semibold">{{ userStore.user_full_name }}</p>
        </div>
    </footer>
</template>