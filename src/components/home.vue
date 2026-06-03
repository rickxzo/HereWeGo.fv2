<template>
  <div class="relative w-full h-screen">
    <GradientBlinds
      :gradient-colors="['#0F5A22', '#0A157A']"
      :angle="20"
      :noise="0.5"
      :blind-count="16"
      :blind-min-width="50"
      :spotlight-radius="0.5"
      :spotlight-softness="1"
      :spotlight-opacity="1"
      :mouse-dampening="0.15"
      :distort-amount="0"
      shine-direction="left"
      mix-blend-mode="lighten"
    />

    <div class="absolute inset-0 z-10 mt-10 flex items-center pointer-events-none">
    <div class="max-w-5xl px-8 md:px-20">

        <h1 class="text-6xl md:text-5xl font-bold text-white leading-[0.9]">
        Reliable Python
        <br />
        Hosting.
        </h1>

        <p class="mt-8 max-w-xl text-lg text-white/60 leading-relaxed">
        Built for Python web applications.
        Reliable hosting without enterprise pricing.
        </p>

        <div class="mt-10 flex items-center gap-4">
        <button @click="hostApp"
            class="px-6 py-3 rounded-xl bg-white text-black font-medium pointer-events-auto"
        >
            Host Your App
        </button>

        <button @click="showDocs"
            class="px-6 py-3 rounded-xl border border-white/10 text-white/80 hover:text-white pointer-events-auto"
        >
            Docs
        </button>
        </div>

        <div class="mt-12 flex gap-8 text-sm text-white/40">
        <span>Always Online</span>
        <span>Low Cost</span>
        <span>Python Native</span>
        <span>Simple Deployment</span>
        </div>

    </div>
    <div class="absolute right-[6%] top-1/2 -translate-y-1/2">
  <div
    class="w-[420px] rounded-2xl border border-white/10
           bg-white/5 backdrop-blur-xl overflow-hidden"
  >
    <div
      class="flex items-center gap-2 px-4 py-3
             border-b border-white/10"
    >
      

      <span class="ml-3 text-sm text-white/50">
        the average deployment
      </span>
    </div>

    <div
      class="p-6 font-mono text-sm leading-8
             text-white/80"
    >
      <div>deploy my-app</div>

      <div class="text-green-400">
        ✓ Repository cloned
      </div>

      <div class="text-green-400">
        ✓ Dependencies installed
      </div>

      <div class="text-green-400">
        ✓ Application online
      </div>

      <div class="text-green-400">
        ✓ Logs served
      </div>

      <div class="mt-4 text-white/50">
        URL
      </div>

      <div class="text-blue-400">
        my-app.herewego.website
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GradientBlinds from "./gb.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const hostApp = () => {
  router.push('/dashboard')
}

const showDocs = () => {
  router.push('/documentation')
}
</script>
