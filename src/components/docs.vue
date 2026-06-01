<template>
  <section class="max-w-4xl mx-auto px-8 pt-36 pb-24 text-white">

    <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
      Documentation
    </h1>

    <p
      class="mt-3 uppercase tracking-[0.35em] text-sm text-zinc-500"
    >
      from repo to production
    </p>

    <div
      class="w-16 h-px bg-zinc-800 mt-16 mb-20"
    />

    <div class="space-y-24">

      <!-- Start with GitHub -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Start with GitHub
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Connect your GitHub account using GitHub OAuth.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          Once connected, HereWeGo can access the repositories
          you choose to deploy.
        </p>
      </div>

      <!-- Pick a Project -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Pick a Project
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Choose the repository you wish to deploy.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          Public or private, it doesn't matter.
          If you can access it, you can deploy it.
        </p>
      </div>

      <!-- Describe How It Runs -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Describe How It Runs
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Create a deployment template for your application.
        </p>

        <div class="mt-8 pl-6 border-l border-zinc-800 space-y-3">
          <p class="text-zinc-400 text-lg">
            Preferred domain name
          </p>

          <p class="text-zinc-400 text-lg">
            Build command
          </p>

          <p class="text-zinc-400 text-lg">
            Run command
          </p>

          <p class="text-zinc-400 text-lg">
            Environment variables
          </p>
        </div>

        <p class="text-xl text-zinc-500 leading-relaxed mt-8">
          If your preferred domain has already been taken,
          you'll need to choose another.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          Make sure your application listens on the port provided
          through the environment variables. Hardcoding ports may
          prevent the deployment from starting correctly.
        </p>
      </div>

      <!-- Launch -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Launch
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Click Deploy.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          HereWeGo will pull your code, install dependencies,
          build the application and prepare the environment.
        </p>
      </div>

      <!-- Get the Address -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Get the Address
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Once deployment is complete, you'll receive a public URL.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          This is the address where your application can be reached.
        </p>
      </div>

      <!-- See What Happened -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          See What Happened
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Review the deployment logs.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          Build output, startup messages and runtime errors
          are all available here.
        </p>
      </div>

      <!-- Try Again if Needed -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Try Again if Needed
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Not every deployment succeeds on the first attempt.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          If something breaks, inspect the logs, rollback if
          necessary, fix the issue and deploy again.
        </p>
      </div>

      <!-- You're Live -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          You're Live
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          If the application starts successfully, it's now online.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          No additional steps required.
        </p>
      </div>

      <!-- Watch It Work -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">
          Watch It Work
        </h2>

        <p class="text-xl text-zinc-300 leading-relaxed">
          Continue monitoring your application's logs.
        </p>

        <p class="text-xl text-zinc-500 leading-relaxed mt-4">
          Requests, startup events, crashes and other runtime
          activity can all be viewed from the dashboard.
        </p>
      </div>

    </div>

    <div class="mt-32 border-t border-zinc-900 pt-16">

      <h3 class="text-2xl font-semibold mb-8">
        Why It's This Simple
      </h3>

      <p class="text-xl text-zinc-300 leading-relaxed">
        HereWeGo began because I needed somewhere reliable to
        deploy my own projects.
      </p>

      <p class="text-xl text-zinc-500 leading-relaxed mt-6">
        Most hosting platforms felt either overly complicated,
        overly expensive or filled with things I didn't need.
        The goal here is simple: connect a repository, describe
        how it runs and get it online.
      </p>

    </div>

  </section>
</template>