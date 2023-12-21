<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import draggable from 'vuedraggable'
import { useUserStore } from '../../stores/user';
import { TeacherTestPayload } from '../../stores/user-interfaces';
const userStore = useUserStore()

const questions_data = ref(userStore?.teacher_profile?.Questions || null)
const added_questions = ref([])
const questions_filter = ref(null)

const questions_data_filter_computed = computed(() => {
    return questions_data?.value.filter(q => {
        if (!added_questions.value.includes(q)) {
            return q.Text_Question.toLocaleLowerCase().includes(questions_filter?.value?.toLocaleLowerCase())
        }
    })
})

const questions_data_computed = computed(() => {
    return questions_data?.value.filter(q => {
        if (!added_questions?.value.includes(q)) {
            return q
        }
    })
})

const drag = ref(false)
const selected_course = ref('default')
const test_deadline = ref("2023-12-29")
const test_title = ref(null)

const create_test_action = async () => {
    if (added_questions.value.length > 0 && selected_course.value !== 'defualt') {
        await userStore.teacher_create_test({
            teacherId: userStore.profile.ID_User,
            Deadline_test: test_deadline.value.toString(),
            questions: added_questions.value.map(x => x.ID_Question),
            Tittle_test: test_title.value,
            courseId: Number(selected_course.value)
        });

    } else {
        setTimeout((() => { toast.error("Проверьте корректность введённых данных.") }), 300)
    }
}
</script>

<template>
    <div class="h-[100vh] mt-[256px] w-[800px] flex items-center flex-col bg-theme-khaki rounded-2xl overflow-y-auto">
        <form class="flex flex-col w-3/4 max-w-[800px] mt-16 mb-[128px]" @submit.prevent="create_test_action">
            <p class="my-4 text-xl font-semibold text-center">Всего {{ added_questions.length }} вопрос(а/ов)</p>

            <input v-model="questions_filter"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Фильтр вопросов" type="text" name="questions_filter" autocomplete="questions_filter">


            <div class="flex w-full h-[256px] draggables">
                <draggable class="w-1/2 h-full px-2 py-4 overflow-y-scroll bg-theme-red"
                    :list="questions_filter ? questions_data_filter_computed : questions_data_computed" group="questions"
                    itemKey="name">
                    <template #item="{ element, index }">
                        <div
                            class="px-2 py-2 my-2 font-semibold duration-200 list-group-item rounded-xl hover:bg-white hover:bg-opacity-40">
                            {{ element.Text_Question }}</div>
                    </template>
                </draggable>

                <draggable class="w-1/2 h-full px-2 py-4 overflow-y-scroll bg-theme-purple" :list="added_questions"
                    group="questions" itemKey="name">
                    <template #item="{ element, index }">
                        <div
                            class="px-2 py-2 my-2 font-semibold duration-200 list-group-item rounded-xl hover:bg-white hover:bg-opacity-40">
                            {{ element.Text_Question }}</div>
                    </template>
                </draggable>
            </div>
            <p class="mt-4 italic text-center">Перетащите нужные вопросы вправо для создания теста</p>

            <input v-model="test_title"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Название теста" type="text" name="login" autocomplete="test_title" required>
            <input v-model="test_deadline"
                class="h-16 px-4 my-4 text-lg text-center text-white outline-none after:text-white bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                type="date" name="login" autocomplete="test_deadline" required>
            <select v-model="selected_course"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                required>
                <option value="default" disabled selected>Выберите курс</option>
                <option v-for="select_option in userStore?.teacher_profile?.Courses" :value="select_option.ID_Course">
                    {{ select_option.ID_Course }} - {{ select_option.Tittle_Course }}</option>
            </select>

            <input type="submit"
                class="h-16 px-8 mx-auto my-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16"
                value="Создать тест">
        </form>
    </div>
</template>