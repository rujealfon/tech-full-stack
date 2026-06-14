<template>
  <nav class="container">
    <ul>
      <li><strong>Tasks App</strong></li>
    </ul>
    <ul>
      <li v-if="route.path !== '/'">
        <RouterLink to="/">Home</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
