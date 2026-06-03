<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  localStorage.removeItem('token')
  localStorage.removeItem('avatar')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  router.replace('/')
})
</script>

<template></template>
