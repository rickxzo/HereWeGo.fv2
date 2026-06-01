<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  localStorage.removeItem('access_token')
  router.replace('/')
})
</script>

<template></template>