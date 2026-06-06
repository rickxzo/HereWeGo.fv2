<script setup>
import { ref, onBeforeMount, computed } from 'vue'

const isAuthenticated = ref(false)
const repos = ref([])
const loading = ref(false)

const user = {
  username: localStorage.getItem('username') || 'GitHub User',
  avatar: localStorage.getItem('avatar') || ''
}

const search = ref('')

const filteredRepos = computed(() => {
  return repos.value.filter(repo =>
    repo.full_name.toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

const fetchRepos = async () => {
  try {
    loading.value = true

    const token = localStorage.getItem('token')

    const response = await fetch(
      'https://herewego-3kgp.onrender.com/api/github-repos',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }

    repos.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  const token = localStorage.getItem('token')

  isAuthenticated.value = !!token

  if (token) {
    await fetchRepos()
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto mt-36">
    <!-- Not Signed In -->
    <div
      v-if="!isAuthenticated"
      class="rounded-2xl p-6"
      :style="{
        backgroundColor: 'rgba(80, 80, 80, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(32px)'
      }"
    >
      <h2 class="text-xl font-semibold text-white">
        Sign In Required
      </h2>

      <p class="text-gray-400 mt-2">
        You must sign in with GitHub to access the dashboard.
      </p>

      <RouterLink
        to="/signin"
        class="inline-flex mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:opacity-90"
      >
        Sign In with GitHub
      </RouterLink>
    </div>

    <!-- Signed In -->
    <div
      v-else
      class="rounded-2xl p-6"
      :style="{
        backgroundColor: 'rgba(80, 80, 80, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(32px)'
      }"
    >
      <div class="flex items-center gap-4">
        <img
          :src="user.avatar"
          :alt="user.username"
          class="w-16 h-16 rounded-xl object-cover"
        />

        <div>
          <h2 class="text-xl font-semibold text-white">
            {{ user.username }}
          </h2>

          <div class="flex items-center gap-2 mt-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span class="text-emerald-400 text-sm">
              Connected
            </span>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-white/10">
        <h3 class="text-lg font-medium text-white">
          Dashboard Under Development
        </h3>

        <p class="text-gray-400 mt-2 leading-relaxed">
          The new HereWeGo dashboard is currently under active development.
          Find the under-progress dashboard at /dashpeek.
          In the meantime, you can continue using the fully functional version at
          <a
            href="https://herewego-3kgp.onrender.com"
            target="_blank"
            class="text-emerald-400 hover:underline"
          >
            herewego-3kgp.onrender.com
          </a>
        </p>
      </div>
      </div>
    </div>
</template>
