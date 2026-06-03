<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Redirecting to GitHub...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const connectGithub = () => {
  window.location.href = 'https://herewego-3kgp.onrender.com/login/github'
}

onMounted(() => {
  connectGithub()
})
</script>
