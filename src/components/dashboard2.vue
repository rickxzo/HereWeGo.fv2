<script setup>
import { ref, onBeforeMount, computed } from 'vue'

const isAuthenticated = ref(false)
const repos = ref([])
const loading = ref(false)
const showDropdown = ref(false)
const domain = ref('')
const buildCommand = ref('')
const runCommand = ref('')
const envVariables = ref('')

const savingConfig = ref(false)

const user = {
  username: localStorage.getItem('username') || 'GitHub User',
  avatar: localStorage.getItem('avatar') || ''
}

const search = ref('')
const selectedRepo = ref(null)
const showModal = ref(false)

const selectRepo = (repo) => {
  selectedRepo.value = repo
  search.value = repo.full_name
  showDropdown.value = false
}

const openConfigure = () => {
  if (!selectedRepo.value) return
  showModal.value = true
  search.value = null
}

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

const saveConfig = async () => {
  try {
    savingConfig.value = true

    const token = localStorage.getItem('token')

    // Create repo config
    const createResponse = await fetch(
      `https://herewego-3kgp.onrender.com/api/create-repo?repo_name=${encodeURIComponent(selectedRepo.value.full_name)}&build=${encodeURIComponent(buildCommand.value)}&run=${encodeURIComponent(runCommand.value)}&domain=${encodeURIComponent(domain.value)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!createResponse.ok) {
      throw new Error('Failed to create repo config')
    }

    const repoData = await createResponse.json()

    // Add secrets
    const secretResponse = await fetch(
      `https://herewego-3kgp.onrender.com/api/add-secrets?repo_id=${repoData.repo_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: envVariables.value
      }
    )

    if (!secretResponse.ok) {
      throw new Error('Failed to save secrets')
    }

    alert('Configuration saved successfully')

    showModal.value = false
    selectedRepo.value = null

  } catch (err) {
    console.error(err)
    alert(err.message)
  } finally {
    savingConfig.value = false
    domain.value = ''
    buildCommand.value = ''
    runCommand.value = ''
    envVariables.value = ''
  }
}

const configs = ref([])
const loadingConfigs = ref(false)

const fetchConfigs = async () => {
  try {
    loadingConfigs.value = true

    const res = await fetch('https://herewego-3kgp.onrender.com/api/repos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    configs.value = await res.json()
  } catch (err) {
    console.error(err)
  } finally {
    loadingConfigs.value = false
  }
}

const deployingRepo = ref(null)
const deployRepo = async (config) => {
  try {
    deployingRepo.value = config.id

    const token = localStorage.getItem('token')

    const response = await fetch(
      `https://herewego-3kgp.onrender.com/api/deploy?repo_id=${config.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Deployment failed')
    }

    const data = await response.json()

    config.status = data.status
    config.link = data.url
    config.deployment_id = data.deployment_id
    config.deployed = true

  } catch (err) {
    console.error(err)
    alert(err.message)
  } finally {
    deployingRepo.value = null
    fetchConfigs()
  }
}

const rollbackRepo = async (config) => {
  try {
    deployingRepo.value = config.id

    const res = await fetch(
      `https://herewego-3kgp.onrender.com/api/rollback?deployment_id=${config.deploy_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.detail || 'Rollback failed')
    }

    console.log('Rollback successful:', data)

    // Refresh configs so status updates
    await fetchConfigs()

  } catch (err) {
    console.error(err)
    alert(err.message)
  } finally {
    deployingRepo.value = null
    fetchConfigs()
  }
}

const deletingRepo = ref('')
const deleteConfig = async (config) => {
  const confirmed = confirm(
    `Are you sure you want to delete config for "${config.name}"?`
  )

  if (!confirmed) return

  try {
    deletingRepo.value = config.id

    const res = await fetch(
      `https://herewego-3kgp.onrender.com/api/delete-repo?repo_id=${config.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to delete repository')
    }

    console.log('Repository deleted:', data)

    // Remove from local state immediately
    configs.value = configs.value.filter(
      repo => repo.id !== config.id
    )

    // Or refresh from backend:
    // await fetchConfigs()

  } catch (err) {
    console.error(err)
    alert(err.message)
  } finally {
    deletingRepo.value = null
    fetchConfigs()
  }
}

const showLogsModal = ref(false)
const logs = ref('')
const logsLoading = ref(false)
const selectedDeploymentId = ref(null)

let logsInterval = null

const fetchLogs = async (deploymentId) => {
  try {
    logsLoading.value = true

    const res = await fetch(
      `https://herewego-3kgp.onrender.com/api/logs?deployment_id=${deploymentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to fetch logs')
    }

    logs.value = data.logs || 'No logs yet.'
  } catch (err) {
    console.error(err)
    logs.value = `Error: ${err.message}`
  } finally {
    logsLoading.value = false
  }
}

const openLogsModal = async (config) => {
  selectedDeploymentId.value = config.deploy_id

  showLogsModal.value = true

  await fetchLogs(config.deploy_id)

  if (logsInterval) {
    clearInterval(logsInterval)
  }

  logsInterval = setInterval(() => {
    fetchLogs(config.deploy_id)
  }, 10000)
}


const refreshLogs = () => {
  if (selectedDeploymentId.value) {
    fetchLogs(selectedDeploymentId.value)
  }
}


const closeLogsModal = () => {
  showLogsModal.value = false

  if (logsInterval) {
    clearInterval(logsInterval)
    logsInterval = null
  }

  selectedDeploymentId.value = null
}

onBeforeMount(async () => {
  const token = localStorage.getItem('token')

  isAuthenticated.value = !!token

  if (token) {
    const results = await Promise.allSettled([
      fetchRepos(),
      fetchConfigs()
    ])

  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto pt-36">
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
    <div v-else >

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
    <!-- Search -->
    <div class="flex-1 relative">
      <input
        v-model="search"
        type="text"
        placeholder="Search repositories..."
        class="w-full h-full rounded-xl px-4 py-4 bg-black/30 border border-white/10 text-white outline-none focus:border-emerald-500"
        @focus="showDropdown = true"
      />

      <!-- Search Results -->
      <div
        v-if="showDropdown && search"
        class="absolute top-full left-0 right-0 mt-2 bg-black/95 border border-white/10 rounded-xl overflow-y-auto max-h-80 z-50"
        style="overflow-anchor: none;"
      >
        <div
          v-for="repo in filteredRepos"
          :key="repo.id"
          @click="selectRepo(repo)"
          class="px-4 py-3 text-white hover:bg-white/5 cursor-pointer border-b border-white/5"
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

    <div class="w-64">
      <button
        @click="openConfigure"
        :disabled="!selectedRepo"
        class="
          w-full h-full py-4
          rounded-2xl
          font-medium
          transition
        "
        :class="
          selectedRepo
            ? 'bg-white text-black cursor-pointer'
            : 'bg-white/10 text-gray-500 cursor-not-allowed'
        "
      >
        Configure Repository
      </button>
    </div>

    </div>

    <div class="mt-6">
  <h2 class="text-xl font-semibold text-white mb-4">
    Configs
  </h2>

  <div v-if="loadingConfigs" class="text-zinc-400">
    Loading configs...
  </div>

  <div
    v-else-if="configs.length"
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
  >
    <div
      v-for="config in configs"
      :key="config.id"
      class="bg-black border border-white/10 rounded-2xl p-5 hover:bg-zinc-950 transition"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold text-white">
            {{ config.name }}
          </h3>

          <a
            :href="config.link"
            target="_blank"
            class="text-sm text-gray-400 hover:underline"
          >
            {{ config.link }}
          </a>
        </div>

        <span
          class="px-3 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-green-500/20 text-green-400': config.status === 'running',
            'bg-red-500/20 text-red-400': config.status === 'failed',
            'bg-yellow-500/20 text-yellow-400': config.status === 'building',
            'bg-gray-500/20 text-white':
            !['running', 'failed', 'building'].includes(config.status)
          }"
        >
          {{ config.status || 'not deployed' }}
        </span>
      </div>

      
      <div class="mt-5 flex gap-2">
        <a
          :href="config.link"
          target="_blank"
          class="px-4 py-2 rounded-lg bg-white text-black font-medium"
        >
          Open
        </a>

        <button
          @click="config.status === 'running' ? rollbackRepo(config) : deployRepo(config)"
          :disabled="deployingRepo === config.id || deleteConfig === config.id"
          class="px-4 py-2 rounded-lg border border-zinc-700 text-white"
        >
          {{
            deployingRepo === config.id
              ? 'Deploying...'
              : config.status === 'running'
              ? 'Rollback'
              : 'Deploy'
          }}
        </button>

        <button @click="openLogsModal(config)"
          :disabled="config.status === 'rolled back'"
          class="px-4 py-2 rounded-lg border border-zinc-700 text-white"
          :class="
            config.status !== 'rolled back'
              ? 'text-white'
              : 'bg-black text-gray-600 cursor-not-allowed'
          "
        >
          Logs
        </button>
        <button @click="deleteConfig(config)"
          :disabled="config.status === 'running' || deletingRepo === config.id"
          class="px-4 py-2 rounded-lg border border-zinc-700 text-white"
          :class = "
          config.status !== 'running'
            ? 'text-white'
            : 'text-gray-600 cursor-not-allowed'
          "
        >
          {{
            deletingRepo === config.id
              ? 'Deleting...'
              : 'Delete'
          }}
        </button>
      </div>
    </div>
  </div>

  <div
    v-else
    class="bg-black border border-white/10 rounded-xl p-8 text-center text-zinc-400"
  >
    No deployments found.
  </div>
</div>
    

    </div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
      :style="{
        backgroundColor: 'rgba(80, 80, 80, 0.25)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(32px)'
      }"
    >
      <div
        class="w-full max-w-4xl rounded-2xl bg-black border border-white/10 p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-white">
            Configure Repository
          </h2>

          <button
            @click="showModal = false"
            class="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        <div class="space-y-3">

  <!-- Selected Repo -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Repository
            </label>

            <div
              class="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white"
            >
              {{ selectedRepo?.full_name }}
            </div>
          </div>

          <!-- Domain -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Domain Name
            </label>

            <div class="flex items-center">
              <input v-model="domain"
                type="text"
                placeholder="my-app"
                class="
                  flex-1
                  rounded-l-xl
                  bg-black/30
                  border border-white/10
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-emerald-500
                "
              />

              <div
                class="
                  px-4 py-3
                  border border-l-0 border-white/10
                  rounded-r-xl
                  bg-white/5
                  text-gray-400
                  whitespace-nowrap
                "
              >
                .herewego.website
              </div>
            </div>
          </div>

          <!-- Build Command -->
          <div class="grid grid-cols-2 gap-4">

            <div>
              <label class="block text-sm text-gray-400 mb-2">
                Build Command
              </label>

              <input v-model = "buildCommand"
                type="text"
                placeholder="pip install -r requirements.txt"
                class="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-2">
                Run Command
              </label>

              <input v-model = "runCommand"
                type="text"
                placeholder="python app.py"
                class="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

          </div>

          <!-- Environment Variables -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Environment Variables
            </label>

            <textarea v-model = "envVariables"
              rows="4"
              placeholder="VAR1=VAL1&#10;VAR2=VAL2&#10;VAR3=VAL3"
              class="
                w-full
                rounded-xl
                bg-black/30
                border border-white/10
                px-4 py-3
                text-white
                outline-none
                resize-none
                focus:border-emerald-500
              "
            ></textarea>
          </div>

          <div class="flex gap-3">

            <button
            @click="saveConfig"
            :disabled="savingConfig"
              class="
                flex-1
                py-3
                rounded-xl
                bg-white
                text-black
                font-semibold
                hover:opacity-90
                transition
              "
            >
              {{ savingConfig ? 'Adding Config...' : 'Save Config' }}
            </button>

            <button
              @click="showModal = false; selectedRepo = null"
              class="
                px-8
                py-3
                rounded-xl
                bg-white
                text-black
                font-medium
                hover:opacity-90
                transition
              "
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </div>
    <div
  v-if="showLogsModal"
  class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
  :style="{
    backgroundColor: 'rgba(80, 80, 80, 0.25)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(32px)'
  }"
>
  <div
    class="w-full max-w-4xl rounded-2xl bg-black border border-white/10 p-6"
  >

    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-white">
        Deployment Logs
      </h2>

      <button
        @click="closeLogsModal"
        class="text-gray-400 hover:text-white text-xl"
      >
        ×
      </button>
    </div>

    <!-- Logs Box -->
    <div
      ref="logsContainer"
      class="
        h-[500px]
        overflow-y-auto
        rounded-xl
        bg-black/30
        border border-white/10
        p-4
        font-mono
        text-sm
        text-zinc-300
        whitespace-pre-wrap
      "
      :style="{
        backgroundColor: 'rgba(80, 80, 80, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(32px)'
      }"
    >
      <div v-if="logsLoading" class="text-gray-400">
        Loading logs...
      </div>

      <pre v-else class="whitespace-pre-wrap break-words">
{{ logs }}
      </pre>
    </div>

    <!-- Footer Buttons -->
    <div class="flex gap-3 mt-4">

      <button
        @click="refreshLogs"
        class="
          flex-1
          py-3
          rounded-xl
          bg-white
          text-black
          font-semibold
          hover:opacity-90
          transition
        "
      >
        Refresh Logs
      </button>

      <button
        @click="closeLogsModal"
        class="
          px-8
          py-3
          rounded-xl
          bg-white
          text-black
          font-medium
          hover:opacity-90
          transition
        "
      >
        Close
      </button>

    </div>

  </div>
</div>
        
  </div>
</template>
