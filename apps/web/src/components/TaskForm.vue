<template>
  <div>
    <article v-if="createMutation.error.value" class="error" style="white-space: pre-wrap">
      {{ createMutation.error.value.message }}
    </article>
    <form @submit="onSubmit">
      <label>
        Name
        <input v-model="name" v-bind="nameAttrs" :disabled="createMutation.isPending.value" />
        <p class="error">{{ errors.name }}</p>
      </label>
      <button type="submit" :disabled="createMutation.isPending.value">Create</button>
    </form>
    <progress v-if="createMutation.isPending.value" />
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { insertTasksSchema } from "@tech-full-stack/api/schema";
import { useForm } from "vee-validate";

import { createTask, queryKeys } from "@/web/lib/queries";

const queryClient = useQueryClient();

const { handleSubmit, errors, resetForm, defineField } = useForm({
  validationSchema: toTypedSchema(insertTasksSchema),
  initialValues: { name: "", done: false },
});

const [name, nameAttrs] = defineField("name");

const createMutation = useMutation({
  mutationFn: createTask,
  onSuccess: () => {
    resetForm();
    queryClient.invalidateQueries(queryKeys.LIST_TASKS);
  },
});

const onSubmit = handleSubmit(data => createMutation.mutate(data));
</script>
