<template>
  <article>
    <h3 :style="{ textDecoration: task.done ? 'line-through' : undefined }">
      {{ task.name }}
    </h3>
    <div class="buttons">
      <RouterLink :to="`/task/${task.id}`" role="button" class="outline">
        View
      </RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { selectTasksSchema } from "@tech-full-stack/api/schema";

defineProps<{ task: selectTasksSchema }>();
</script>
