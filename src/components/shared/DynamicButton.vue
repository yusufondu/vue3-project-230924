<template>
  <button
    @click="handleClick"
    :disabled="isDisabled"
    :class="[
      'btn',
      customClass,
      isDisabled ? 'cursor-not-allowed bg-gray-400' : hoverClass,
    ]"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from "vue";

export default defineComponent({
  name: "DynamicButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
    hoverClass: {
      type: String,
      default: "hover:bg-blue-700",
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = () => {
      if (!props.isDisabled) {
        emit("click");
      }
    };

    return { handleClick };
  },
});
</script>

<style scoped>
.btn {
  @apply font-bold text-base px-4 py-2 text-white border-none cursor-pointer rounded-md w-44;
}
</style>
