import { createStore, Store } from "vuex";
import race from "@/store/modules/race";
import { nextTick } from "vue";

describe("race Vuex module", () => {
  let store: Store<any>;

  beforeEach(() => {
    store = createStore({
      modules: {
        race: {
          state: race.state,
          getters: race.getters,
          actions: race.actions,
          mutations: race.mutations,
          namespaced: true,
        },
      },
    });
  });

  test("initial state", () => {
    const initialState = {
      horses: [],
      schedule: [],
      results: [],
      running: false,
      finished: false,
      paused: false,
      generated: false,
    };
    expect(store.state.race).toEqual(initialState);
  });

  test("generateHorses action", async () => {
    await store.dispatch("race/generateHorses");
    await nextTick();

    expect(store.state.race.horses.length).toBe(20);

    store.state.race.horses.forEach((horse: any, index: number) => {
      expect(horse).toHaveProperty("id", index + 1);
      expect(horse).toHaveProperty("condition");
      expect(horse).toHaveProperty("color");
      expect(horse).toHaveProperty("horseName");
    });
  });

  test("generateSchedule action", async () => {
    await store.dispatch("race/generateHorses");
    await store.dispatch("race/generateSchedule");
    await nextTick();

    expect(store.state.race.schedule.length).toBe(6);

    store.state.race.schedule.forEach((run: any) => {
      expect(run.horses.length).toBe(10);
      expect(run).toHaveProperty("distance");
    });

    expect(store.state.race.generated).toBe(true);
  });

  test("startRace action", async () => {
    await store.dispatch("race/generateHorses");
    await store.dispatch("race/generateSchedule");
    await nextTick();

    await store.dispatch("race/startRace");
    expect(store.state.race.running).toBe(true);
    expect(store.state.race.paused).toBe(false);

    await store.dispatch("race/startRace");
    expect(store.state.race.paused).toBe(true);

    await store.dispatch("race/startRace");
    expect(store.state.race.paused).toBe(false);
  });

  test("stopRace action", async () => {
    await store.dispatch("race/generateHorses");
    await store.dispatch("race/generateSchedule");
    await store.dispatch("race/startRace");
    await nextTick();

    await store.dispatch("race/stopRace");
    expect(store.state.race.running).toBe(false);
    expect(store.state.race.paused).toBe(false);
  });
});
