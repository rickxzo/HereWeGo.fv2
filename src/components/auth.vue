<!-- AuthCallback.vue -->
<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const token = route.query.token
  const id = route.query.id
  const username = route.query.username
  const avatar = route.query.avatar

  if (token) {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', id)
    localStorage.setItem('username', username)
    localStorage.setItem('avatar', avatar)
  }

  router.replace('/dashboard')
})
</script>

<template>
  <div>Signing you in...</div>
</template>
