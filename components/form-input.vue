<template>
  <div>
    <label class="text-xs flex flex-col">
      {{ label }}
      <input
        :type="type || 'text'"
        class="border border-gray-300 h-8 rounded mt-1 text-sm px-2"
        v-model="textValue"
      />
    </label>

    <div class="flex items-center text-[16px] mt-2" v-if="errorMessage">
      <ErrorIcon class="h-5 fill-red-600" />
      <span class="ml-2 leading-tight text-red-600">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ErrorIcon from "./svg-components/error-icon.vue";

const props = defineProps<{
  label: string;
  errorMessage: string;
  modelValue: string;
  type?: string;
}>();

const emits = defineEmits(["update:model-value"]);

const textValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:model-value", value);
  },
});
</script>

<style scoped></style>
