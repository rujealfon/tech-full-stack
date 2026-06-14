<template>
  <AppNavbar />
  <main class="container" style="margin-top: 1rem">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import AppNavbar from "./components/AppNavbar.vue";
</script>
