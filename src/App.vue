<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { container } from "jenesius-vue-modal";


import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user';
import { onMounted } from 'vue';
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  if (localStorage.getItem('userStore') !== null) {
    userStore.load_state()
  }
  userStore.$subscribe((mutation, state) => {
    localStorage.setItem('userStore', JSON.stringify(state))    
  })
})
</script>

<template>
  <div class="wrapper">
    <RouterView />
    <container/>
  </div>
</template>

<style scoped></style>
