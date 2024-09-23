<template>
  <div class="min-w-[200px]">
    <h2 class="text-xl font-bold mb-2 bg-blue-500 text-white p-2">Program</h2>
    <div class="overflow-y-auto max-h-[500px]">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div v-for="(run, index) in schedule" :key="index" class="mb-2">
          <h3 class="text-lg font-semibold mb-4 bg-orange-400 p-2">
            {{ index + 1 }}ST Lap {{ run.distance }}m
          </h3>
          <DynamicTable
            :headers="['Position', 'Name']"
            :data="
              run.horses.map((horse: any, index: any) => [
                index + 1,
                { value: horse.horseName, color: horse.color },
              ])
            "
            :cellStyle="
              (cell, index) => (index === 1 ? { color: cell.color } : {})
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import DynamicTable from "@/components/shared/DynamicTable.vue";

export default defineComponent({
  name: "RaceSchedule",
  components: {
    DynamicTable,
  },
  setup() {
    const store = useStore();
    const schedule = computed(() => store.getters["raceSchedule"]);
    return { schedule };
  },
});
</script>
