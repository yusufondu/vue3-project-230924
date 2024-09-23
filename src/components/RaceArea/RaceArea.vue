<template>
  <div class="race-animation mx-4">
    <div class="race-track">
      <div class="start-line">
        <div
          v-for="(horse, index) in currentRun?.horses"
          :key="horse.id"
          class="horse-id flex justify-center items-center w-max p-2"
        >
          <span class="p-2 bg-green-500 w-10 mr-2">{{ index + 1 }}</span>
          {{ horse.horseName }}
        </div>
      </div>
      <div class="race-line">
        <div v-for="horse in currentRun?.horses" :key="horse.id" class="horse">
          <HorseIcon :color="horse.color" />
        </div>
      </div>
      <div class="finish-line"></div>
    </div>
    <div v-if="currentRun" class="race-info mt-4">
      <h3
        class="text-xl font-semibold mb-4 bg-transparent text-red-500 p-2 rounded"
      >
        {{ currentRunIndex + 1 }}ST Lap {{ currentRun.distance }}m
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import { Horse } from "@/interfaces/horses.interface";
import { Run } from "@/interfaces/race.interface";
import HorseIcon from "@/components/shared/HorseIcon.vue";

export default defineComponent({
  name: "RaceArea",
  components: {
    HorseIcon,
  },

  setup() {
    const store = useStore();
    const currentRunIndex = ref(0);
    const currentRun = computed<Run | undefined>(
      () => store.getters["raceSchedule"][currentRunIndex.value]
    );

    let timeline: gsap.core.Timeline | null = null;
    let isAnimating = ref(false);

    const startRace = () => {
      if (isAnimating.value) return;

      isAnimating.value = true;
      const run = currentRun.value;

      if (run) {
        animateRun(run.horses, run.distance).then((finishTimes) => {
          const resultHorses = run.horses.map((horse, index) => ({
            ...horse,
            finishTime: finishTimes[index],
          }));

          store.commit("addRunResultWithFinishTimes", {
            runIndex: currentRunIndex.value,
            resultHorses,
          });
          currentRunIndex.value += 1;
          if (currentRunIndex.value < 6) {
            nextTick(() => {
              resetHorsesPosition();
              startRace();
            });
          } else {
            store.commit("setRaceFinished", true);
          }
          isAnimating.value = false;
        });
      }
    };

    const resetHorsesPosition = () => {
      const horses = document.querySelectorAll(".horse");
      horses.forEach((horse) => {
        gsap.set(horse, { x: 0 });
      });
    };

    const getEndPosition = () => {
      const raceTrack = document.querySelector(".race-track");
      const finishLine = document.querySelector(".finish-line");
      const startLine = document.querySelector(".start-line");

      if (raceTrack && finishLine && startLine) {
        const raceTrackRect = raceTrack.getBoundingClientRect();
        const finishLineRect = finishLine.getBoundingClientRect();
        const startLineRect = startLine.getBoundingClientRect();
        const endPosition = finishLineRect.left - raceTrackRect.left;
        const startLineEnd = startLineRect.right - raceTrackRect.left;

        return endPosition - startLineEnd;
      }
      return 0;
    };

    const animateRun = (horses: Horse[], distance: number) => {
      return new Promise<number[]>((resolve) => {
        const finishTimes: number[] = [];
        timeline = gsap.timeline({
          onComplete: () => resolve(finishTimes),
        });

        const endPosition = getEndPosition();

        horses.forEach((horse, index) => {
          const duration = distance / (50 + Math.random() * 50);
          finishTimes.push(duration);

          timeline?.to(
            `.horse:nth-child(${index + 1})`,
            {
              duration,
              x: `${endPosition}px`,
              ease: "linear",
              onUpdate: () => {
                gsap.to(`.horse:nth-child(${index + 1})`, {
                  y: Math.sin(performance.now() / 100) * 5,
                });
              },
            },
            0
          );
        });
      });
    };

    const stopRace = () => {
      if (timeline) {
        timeline.pause();
        resetHorsesPosition();
        isAnimating.value = false;
      }
    };

    watch(
      () => store.state.race.running,
      (newValue) => {
        if (newValue) {
          startRace();
        } else {
          stopRace();
        }
      }
    );

    return { currentRun, currentRunIndex };
  },
});
</script>

<style scoped>
.race-animation {
  .race-info {
    margin-bottom: 10px;
  }
  .race-track {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    border-radius: 5px;
    width: 100%;
    position: relative;
    .start-line,
    .finish-line {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .start-line {
      align-items: flex-start;
      .horse-id {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .finish-line {
      height: 100%;
      writing-mode: vertical-rl;
      font-weight: bold;
      width: 5px;
      background: repeating-linear-gradient(
        0deg,
        #ff6347,
        #ff6347 10px,
        transparent 10px,
        transparent 20px
      );
      color: white;
    }
    .race-line {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .horse {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        position: relative;
      }
    }
  }
}

.race-info h3,
.race-info p {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
