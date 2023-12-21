<script setup lang="ts">
import TeacherHeader from '@/components/TeacherHeader.vue';
import FooterComponent from '@/components/UserFooter.vue'
import PlusSignComponent from '@/components/PlusSignComponent.vue'
import CreateTest from '@/components/Teacher/CreateTest.vue';
import { openModal } from "jenesius-vue-modal";
import { useUserStore } from '../../stores/user';

const userStore = useUserStore()

const items = [
    "Тестовое название теста",
    "Тестовое название теста 2",
    "Тестовое название теста 3",
    "Тестовое название теста 4",
]


const show_create_test_modal = async () => {
    let modal = await openModal(CreateTest)
}

</script>


<template>
    <TeacherHeader />
    <main class="mt-[64px] mb-16 p-16 min-h-screen">
        <div class="flex flex-col items-center">
            <PlusSignComponent @click="show_create_test_modal" />
            <!-- <RouterLink class="w-full" v-for="item in items" :key="item" to="'/teacher/lection/1'"> -->
            <div class="w-full" v-for="(test, index) in userStore?.teacher_profile?.Tests" :key="test.ID_Test"
                to="'/teacher/lection/1'">
                <div
                    :class='["bg-theme-red", `duration-150 hover:opacity-100 hover:scale-105`, "h-[96px] opacity-80 cursor-pointer my-2 px-8 font-semibold text-2xl rounded-xl flex items-center justify-between"]'>
                    <p class="w-[60%] overflow-hidden text-ellipsis">{{ test.Tittle_test }}
                    </p>
                    <p class="text-sm italic font-normal text-center opacity-40">{{
                        userStore?.teacher_profile?.Courses?.filter(item => item.ID_Course ==
                            test.courseId)[0]?.Tittle_Course
                    }}</p>
                </div>
            </div>
            <!-- </RouterLink> -->
        </div>
    </main>
    <FooterComponent />
</template>