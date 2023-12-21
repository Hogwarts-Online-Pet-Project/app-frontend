<script setup lang="ts">
// TODO: MB ADD ANSWER LIST MODAL VIEW?
import { ref, onMounted } from 'vue'
import TeacherHeader from '@/components/TeacherHeader.vue';
import FooterComponent from '@/components/UserFooter.vue'

const userStore = useUserStore()

import { openModal } from "jenesius-vue-modal";
import { useUserStore } from '../../stores/user';

// const show_create_question_modal = async () => {
//     let modal = await openModal(CreateQuestion)
// }
</script>

<template>
    <TeacherHeader />
    <main class="mt-[64px] mb-16 p-16 min-h-screen">

        <div class="flex flex-col items-center">
            <!-- <RouterLink class="w-full" v-for="item in items" :key="item" to="'/teacher/lection/1'"> -->
            <div class="w-full" v-for="(result, index) in userStore?.teacher_profile?.Results" :key="result.ID_Passed_Test">
                <div
                    :class='["bg-theme-red", `duration-150 hover:opacity-100 hover:scale-105`, "h-[96px] opacity-80 cursor-pointer my-2 px-8 font-semibold text-2xl rounded-xl flex items-center justify-between"]'>
                    <p class="w-[70%] overflow-hidden text-ellipsis">Баллов: {{ result.Score_Passed_Test }} | Студент: {{
                        result.student_name }} </p>
                    <p class="text-sm italic font-normal text-center text-white opacity-40">{{ result.test_title }}
                    </p>
                </div>
            </div>
            <!-- </RouterLink> -->
        </div>
    </main>
    <FooterComponent />
</template>