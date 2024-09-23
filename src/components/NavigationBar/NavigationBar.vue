<template>
  <div class="flex flex-col sm:flex-row justify-between items-center w-full">
    <div>
      <h1 class="font-bold text-2xl sm:text-2xl">Horse Racing</h1>
    </div>
    <div class="relative mt-4 sm:mt-0">
      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <DynamicButton
          label="Generate Program"
          customClass="bg-blue-500"
          :isDisabled="isRunning || isGenerated"
          @click="generateProgram"
        />
        <DynamicButton
          :label="isRunning ? 'Pause' : 'Start'"
          :customClass="isRunning ? 'bg-yellow-500' : 'bg-green-500'"
          :isDisabled="!isGenerated"
          @click="toggleRace"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import DynamicButton from "../shared/DynamicButton.vue";

export default defineComponent({
  name: "NavigationBar",
  components: {
    DynamicButton,
  },
  setup() {
    const store = useStore();
    const isRunning = computed(() => store.getters.isRaceRunning);
    const isGenerated = computed(() => store.getters.isGenerated);

    const generateProgram = () => {
      store.dispatch("generateSchedule");
    };

    const toggleRace = () => {
      if (isRunning.value) {
        store.dispatch("stopRace");
      } else {
        store.dispatch("startRace");
      }
    };

    return {
      generateProgram,
      toggleRace,
      isRunning,
      isGenerated,
    };
  },
});
</script>
