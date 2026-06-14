<template>
  <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
</template>

<script setup lang="ts">
import type { selectTasksSchema } from "@tech-full-stack/api/schema";

import TaskItem from "./TaskItem.vue";

defineProps<{ tasks: selectTasksSchema[] }>();
</script>
