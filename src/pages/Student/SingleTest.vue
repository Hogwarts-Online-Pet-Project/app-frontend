<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FooterComponent from '@/components/UserFooter.vue'
import { useUserStore } from '../../stores/user';
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify';

const selected_item = ref(null)
const selected_index = ref(0)
const test_result = ref(null)
const user_data = ref({ answers: [] })

const userStore = useUserStore()
const router = useRoute()
// const test_selector = userStore.students_courses[Number(router.query?.courseIndex)]?.tests[router.params.id]
const test_selector = userStore.get_student_course_sorted_meta(Number(router.query?.courseIndex))[Number(router.params.id)]


const next_question = async () => {
    if (selected_index.value + 1 < test_selector.test_question.length) {
        if (user_data.value.answers[selected_index.value] == null) {
            toast.warn("Введите ответ на вопрос")
            return
        }
        selected_index.value++
        selected_item.value = test_selector.test_question[selected_index.value]
    } else {
        await userStore.student_send_answers({
            ID_User: userStore.profile.ID_User,
            ID_test: test_selector.ID_Test,
            answers: user_data.value.answers
        })
    }
}

onMounted(() => {
    selected_item.value = test_selector.test_question[selected_index.value]
})
</script>


<template>
    <header class="h-[96px] z-10 fixed top-0 left-0 w-screen bg-theme-pearl flex items-center justify-center text-center">
        <p class="text-2xl font-xl">{{ test_selector.Tittle_test }}</p>
    </header>

    <main class="flex mt-[160px] flex-col items-center justify-center">
        <div class="flex relative py-16 items-center justify-center bg-theme-khaki rounded-2xl min-h-[600px] w-[80%]">
            <div class="flex flex-col card_group w-[80%] text-center" v-if="!test_result">
                <p class="text-xl font-semibold question">Вопрос №{{ selected_index + 1 }}. {{
                    selected_item?.questions.Text_Question }}
                </p>
                <textarea v-model="user_data.answers[selected_index]"
                    class="h-16 pt-4 mt-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                    placeholder="Введите ответ" type="text" name="answer" autocomplete="off" required />
                <input @click="next_question" type="submit"
                    class="h-16 px-16 mx-auto mt-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16"
                    :value="selected_index + 1 == test_selector.test_question.length ? 'Сдать тест' : 'Следующий вопрос'">
                <p class="mt-8 mb-8 italic text-center opacity-40">вопрос {{ selected_index + 1 }}/{{
                    test_selector?.test_question.length }}
                </p>

            </div>
            <div class="flex flex-col card_group w-[80%] text-center" v-else>
                <p class="text-xl font-semibold text-center question">Результат: {{ test_result }} балл(a/ов)</p>
                <input @click="$router.push('/student/courses')" type="submit" value="К курсам"
                    class="h-16 px-16 mx-auto mt-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16">
            </div>
        </div>
    </main>

    <FooterComponent />
</template>

<style scoped></style>