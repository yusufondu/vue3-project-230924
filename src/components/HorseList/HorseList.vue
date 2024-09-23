<template>
  <div class="flex flex-col justify-center items-start">
    <h2 class="text-xl text-left font-bold p-2 mb-1 bg-yellow-300 w-full">
      Horse List (1-20)
    </h2>
    <div class="max-h-[500px] overflow-y-auto w-full">
      <DynamicTable
        :headers="['Name', 'Condition', 'Color']"
        :data="tableData"
        :showIcon="true"
        :iconColumnIndex="2"
        :cellStyle="cellStyle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Horse } from "@/interfaces/horses.interface";
import DynamicTable from "@/components/shared/DynamicTable.vue";

export default defineComponent({
  name: "HorseList",
  components: {
    DynamicTable,
  },
  setup() {
    const store = useStore();
    
    onMounted(() => {
      store.dispatch("generateHorses");
    });

    const horses = computed(() => store.getters.horseList);

    const sortedHorses = computed(() => {
      return [...horses.value].sort((a: Horse, b: Horse) => a.id - b.id);
    });

    const tableData = computed(() => {
      return sortedHorses.value.map((horse: Horse) => [
        horse.horseName,
        horse.condition,
        horse.color,
      ]);
    });

    const cellStyle = (cell: string | number, index: number) => {
      return index === 2 ? { class: "text-center" } : {};
    };

    return { tableData, cellStyle };
  },
});
</script>
