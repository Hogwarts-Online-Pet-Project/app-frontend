<script setup lang="ts">
import { ref } from 'vue'
import FooterComponent from '@/components/UserFooter.vue'
import TeacherHeader from '@/components/TeacherHeader.vue';
import { toast } from 'vue3-toastify'
import { useUserStore } from '../../stores/user';

const userStore = useUserStore()

const old_password = ref(null)
const new_password = ref(null)
const new_password_confirmation = ref(null)

const form_submit = async () => {
    if (!old_password.value || !new_password.value || !new_password_confirmation.value) {
        toast.error("Заполнены не все поля")
        return
    }
    if (new_password.value !== new_password_confirmation.value) {
        toast.error("Введённые пароли не совпадают")
        return
    }
    userStore.user_change_password({ old_password: old_password.value, new_password: new_password.value, new_password_confirmation: new_password_confirmation.value, ID_User: userStore.profile.ID_User })
}


</script>


<template>
    <TeacherHeader />
    <main class="flex items-center justify-center flex-1 w-screen min-h-screen px-8 py-32 overflow-scroll">
        <div class="flex relative items-center justify-center bg-theme-khaki rounded-2xl h-[80%] w-[80%]">
            <div class="flex flex-col py-8 w-[70%] max-w-[700px] card_group">
                <!-- <p class="text-xl font-semibold text-center">Курс: 1337228</p> -->
                <form class="flex flex-col" action="" @submit.prevent="form_submit">
                    <input v-model="old_password"
                        class="h-16 mt-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                        placeholder="Текущий пароль" type="text" name="answer" autocomplete="off" required>
                    <input v-model="new_password"
                        class="h-16 mt-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                        placeholder="Новый пароль" type="text" name="answer" autocomplete="off" required>
                    <input v-model="new_password_confirmation"
                        class="h-16 mt-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                        placeholder="Подтверждение пароля" type="text" name="answer" autocomplete="off" required>
                    <input type="submit"
                        class="h-16 px-16 mx-auto mt-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16"
                        value="Сохранить изменения">
                </form>
                <a v-if="userStore?.profile?.contract?.Contract_File" :href="`/api/v1/uploads/${userStore?.profile?.contract?.Contract_File}`" target="_blank" rel="noopener noreferrer">
                    <div
                        class="flex items-center justify-center h-16 px-16 mx-auto mt-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16">
                        Скачать договор.pdf
                    </div>
                </a>
            </div>
            <!-- <p class="absolute bottom-0 mb-8 italic opacity-40">вопрос {{ selected_index + 1 }}/{{ questions.length }}</p> -->
        </div>
    </main>

    <FooterComponent />
</template>

<style scoped></style>