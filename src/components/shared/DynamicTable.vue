<template>
  <div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-300 text-black border-b">
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="py-2 px-2 text-center text-base"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :style="cellStyle(cell, cellIndex)"
            class="py-2 border-b font-semibold"
          >
            <HorseIcon
              v-if="showIcon && isIconColumn(cellIndex)"
              :color="cell"
            />
            <template v-else>
              {{ formatCell(cell, cellIndex) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType } from "vue";
import HorseIcon from "@/components/shared/HorseIcon.vue";

export default defineComponent({
  name: "DynamicTable",
  components: { HorseIcon },
  props: {
    headers: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<any[][]>,
      required: true,
    },
    cellStyle: {
      type: Function as PropType<(cell: any, index: number) => object>,
      default: () => () => ({}),
    },
    formatCell: {
      type: Function as PropType<(cell: any, index: number) => any>,
      default: (cell: any) =>
        typeof cell === "object" && "value" in cell ? cell.value : cell,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    iconColumnIndex: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    isIconColumn(cellIndex: number) {
      return cellIndex === this.iconColumnIndex;
    },
  },
});
</script>
