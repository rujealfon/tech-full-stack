<template>
  <article>
    <progress v-if="pending" />
    <article v-if="mutationError" class="error">{{ mutationError }}</article>
    <template v-if="data">
      <form @submit="onSubmit">
        <label>
          Name
          <input v-model="name" v-bind="nameAttrs" :disabled="pending" />
          <p class="error">{{ errors.name }}</p>
        </label>
        <fieldset>
          <label>
            <input type="checkbox" v-model="done" v-bind="doneAttrs" :disabled="pending" />
            Done
          </label>
          <p class="error">{{ errors.done }}</p>
        </fieldset>
        <button type="submit" :disabled="pending || !meta.dirty" class="contrast">
          Save
        </button>
      </form>
      <div class="buttons">
        <button type="button" class="contrast" :disabled="pending" @click="deleteMutation.mutate(id)">
          Delete
        </button>
        <RouterLink role="button" :to="`/task/${id}`" class="contrast outline">
          Cancel
        </RouterLink>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { patchTasksSchema } from "@tech-full-stack/api/schema";
import { useForm } from "vee-validate";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { createTaskQueryOptions, deleteTask, queryKeys, updateTask } from "@/web/lib/queries";

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();
const id = route.params.id as string;

const { data } = useQuery(createTaskQueryOptions(id));

const { handleSubmit, errors, meta, defineField, setValues } = useForm({
  validationSchema: toTypedSchema(patchTasksSchema),
});

watch(data, (val) => {
  if (val) setValues(val);
}, { immediate: true });

const [name, nameAttrs] = defineField("name");
const [done, doneAttrs] = defineField("done");

const deleteMutation = useMutation({
  mutationFn: deleteTask,
  onSuccess: async () => {
    await queryClient.invalidateQueries(queryKeys.LIST_TASKS);
    router.push("/");
  },
});

const updateMutation = useMutation({
  mutationFn: updateTask,
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        ...queryKeys.LIST_TASKS.queryKey,
        ...queryKeys.LIST_TASK(id).queryKey,
      ],
    });
    router.push(`/task/${id}`);
  },
});

const pending = computed(() => deleteMutation.isPending.value || updateMutation.isPending.value);
const mutationError = computed(() => deleteMutation.error.value?.message || updateMutation.error.value?.message);

const onSubmit = handleSubmit(formData => updateMutation.mutate({ id, task: formData }));
</script>
