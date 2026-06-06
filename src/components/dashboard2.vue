<script setup>
import { ref, onBeforeMount, computed } from 'vue'

const isAuthenticated = ref(false)
const repos = ref([])
const loading = ref(false)
const showDropdown = ref(false)

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
    console.log(repos.value[0])
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
  <div class="max-w-7xl mx-auto mt-36">
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
    <div v-else class="w-full">

        <!-- Top Row -->
    <div class="flex gap-4 items-stretch mb-6">

    <!-- Repo Count -->
    <div
        class="w-80 rounded-2xl px-6 flex items-center"
    >
        <p
        v-if="loading"
        class="text-emerald-400"
        >
        Fetching repositories...
        </p>

        <p
        v-else-if="repos.length"
        class="text-white text-lg"
        >
        {{ repos.length }} repos fetched
        </p>

        <p
        v-else
        class="text-red-400"
        >
        No repositories found
        </p>
    </div>

    <!-- Search -->
    <div class="flex-1 relative">
  <input
    v-model="search"
    type="text"
    placeholder="Search repositories..."
    class="w-full h-full rounded-xl px-4 py-4 bg-black/30 border border-white/10 text-white outline-none focus:border-emerald-500"
  />

  <!-- Search Results -->
  <div
    v-if="search"
    class="
      absolute
      top-full
      left-0
      right-0
      mt-2
      bg-black/95
      border border-white/10
      rounded-xl
      overflow-y-auto
      max-h-80
      z-50
    "
  >
    <div
      v-for="repo in filteredRepos"
      :key="repo.id"
      class="
        px-4
        py-3
        text-white
        hover:bg-white/5
        cursor-pointer
        border-b
        border-white/5
      "
    >
      {{ repo.full_name }}
    </div>

    <div
      v-if="filteredRepos.length === 0"
      class="px-4 py-3 text-gray-500"
    >
      No repositories found
    </div>
  </div>
</div>

    <div class="w-64 border bg-white rounded-2xl">
        <button
        class="
            w-full h-full
            rounded-2xl
            border border-emerald-500/30
            bg-emerald-500/10
            text-black
            font-medium
            transition
        "
        >
        Configure Repository
        </button>
    </div>

    </div>
    

    </div>
        
  </div>
</template>
