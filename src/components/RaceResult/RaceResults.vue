<template>
  <div class="min-w-[250px]">
    <h2 class="text-xl font-bold mb-2 bg-green-500 text-white p-2">Results</h2>
    <div class="overflow-y-auto max-h-[500px]">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div v-for="(result, index) in sortedResults" :key="index" class="mb-2">
          <h3 class="text-lg mb-4 bg-orange-400 p-2 font-semibold">
            {{ index + 1 }}ST Lap {{ distances[index] }}m
          </h3>
          <DynamicTable
            :headers="['Position', 'Name', 'Finish Time']"
            :data="
              result.map((horse: any, index: any) => [
                index + 1,
                { value: horse.horseName, color: horse.color },
                `${horse.finishTime.toFixed(2)}s`,
              ])
            "
            :cellStyle="
              (cell: any, index: any) => (index === 1 ? { color: cell.color } : {})
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import DynamicTable from "@/components/shared/DynamicTable.vue";

export default defineComponent({
  name: "RaceResults",
  components: {
    DynamicTable,
  },
  setup() {
    const store = useStore();
    const results = computed(() => store.getters["raceResults"]);
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];

    const sortedResults = computed(() =>
      results.value.map((run: any) =>
        [...run].sort((a, b) => a.finishTime - b.finishTime)
      )
    );

    return { sortedResults, distances };
  },
});
</script>
