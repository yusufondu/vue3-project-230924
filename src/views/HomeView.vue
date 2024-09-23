<template>
  <div class="flex flex-col">
    <header
      class="sticky top-0 bg-red-400 text-black p-4 flex justify-between items-center z-10"
    >
      <NavigationBar />
    </header>
    <main class="flex flex-col sm:flex-row overflow-hidden">
      <div class="p-4">
        <HorseList />
      </div>
      <div class="flex flex-col sm:flex-row flex-1 p-4 gap-4">
        <div class="flex-3">
          <RaceArea />
        </div>
        <div class="flex-1">
          <RaceSchedule />
        </div>
        <div class="flex-1">
          <RaceResults />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import HorseList from "@/components/HorseList/HorseList.vue";
import RaceSchedule from "@/components/RaceSchedule/RaceSchedule.vue";
import RaceArea from "@/components/RaceArea/RaceArea.vue";
import RaceResults from "@/components/RaceResult/RaceResults.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    NavigationBar,
    HorseList,
    RaceSchedule,
    RaceArea,
    RaceResults,
  },
});
</script>

<style lang="scss"></style>
