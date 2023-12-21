<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../stores/user';
import { toast } from 'vue3-toastify';
const userStore = useUserStore()
const question = ref("")
const answer = ref("")
const files = ref([])

const submit_question = async () => {
    await userStore.teacher_create_question({
        Text_Question: question.value,
        Answer_Question: answer.value,
        teacherId: userStore.profile.ID_User
    })
}

const submit_import = async (e) => {
    if (e?.target?.files.length <= 0) {
        toast.warn("Не выбран файл для импорта")
        return
    }

    let formData = new FormData();
    formData.append("teacher_import_file", e.target.files[0]);
    await userStore.teacher_import_questions(formData)

}
</script>

<template>
    <div class="min-h-[500px] min-w-[800px] flex items-center justify-center flex-col bg-theme-khaki rounded-2xl">
        <form class="flex flex-col w-3/4 max-w-[800px] mt-8" @submit.prevent="submit_question">
            <input v-model="question"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Вопрос" type="text" name="question" required />
            <input v-model="answer"
                class="h-16 my-4 text-lg text-center text-white outline-none bg-theme-red rounded-xl placeholder:text-white placeholder:opacity-40 placeholder:text-lg"
                placeholder="Ответ на вопрос" type="text" name="answer" required />
            <div class="flex items-center justify-center">
                <input type="submit"
                    class="h-16 px-8 mx-4 my-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red hover:px-16"
                    value="Создать" />
                <input type="button" @click="userStore.teacher_export_questions"
                    class="h-16 px-8 mx-4 my-4 text-white duration-150 ease-in-out outline-none cursor-pointer bg-theme-pearl w-fit rounded-xl hover:bg-theme-red"
                    value="Экспорт .csv" />
            </div>
            <div class="flex items-center justify-center w-full mb-8">
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Нажмите для
                                загрузки</span> или перетащите файл в эту область</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">только CSV-формат</p>
                    </div>
                    <input v-on:change="submit_import" id="dropzone-file" name="teacher_import_file" type="file"
                        class="hidden" accept="text/csv" />
                </label>
            </div>
        </form>
    </div>
</template>