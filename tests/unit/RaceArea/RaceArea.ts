import { mount, VueWrapper } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import RaceArea from "@/components/RaceArea/RaceArea.vue";

interface Horse {
  id: number;
  color: string;
  finishTime?: number;
}

interface Run {
  distance: number;
  horses: Horse[];
}

interface State {
  raceSchedule: Run[];
  race: {
    running: boolean;
  };
}

describe("RaceArea.vue", () => {
  let store: Store<State>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore<State>({
      state: {
        raceSchedule: [
          {
            distance: 1200,
            horses: [
              { id: 1, color: "rgb(102, 255, 51);" },
              { id: 2, color: "rgb(102, 255, 52);" },
            ],
          },
          {
            distance: 1400,
            horses: [
              { id: 3, color: "rgb(102, 255, 53);" },
              { id: 4, color: "rgb(102, 255, 54);" },
            ],
          },
        ],
        race: {
          running: false,
        },
      },
      getters: {
        raceSchedule: (state) => state.raceSchedule,
      },
      mutations: {
        addRunResultWithFinishTimes: jest.fn(),
        setRaceFinished: jest.fn(),
      },
    });

    wrapper = mount(RaceArea, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders the current run information correctly", async () => {
    store.state.race.running = true;
    store.state.raceSchedule = [
      {
        distance: 1200,
        horses: [
          { id: 1, color: "rgb(102, 255, 51);" },
          { id: 2, color: "rgb(102, 255, 52);" },
        ],
      },
    ];

    await wrapper.vm.$nextTick();

    const distanceElement = wrapper.find("h3");
    expect(distanceElement.text()).toContain("1200m");

    const roundElement = wrapper.find("h3");
    expect(roundElement.text()).toContain("1ST Lap");
  });

  it("calls animateRun and update store when starting the race", async () => {
    store.state.race.running = true;
    await wrapper.vm.$nextTick();

    expect(store.state.race.running).toBe(true);

    await wrapper.vm.startRace();
    await wrapper.vm.$nextTick();

    expect(store.commit).toHaveBeenCalledWith("addRunResultWithFinishTimes", expect.any(Object));
  });

  it("resets horse positions when stopping the race", () => {
    store.state.race.running = false;
    wrapper.vm.resetHorsesPosition();
  
    const horses = wrapper.findAll(".horse");
    horses.forEach((horseWrapper) => {
      const horseElement = horseWrapper.element as HTMLElement;
      expect(horseElement.style.transform).toContain("translateX(0px)");
    });
  });
  

  it("correctly handles race progress and results", async () => {
    store.state.race.running = true;
    await wrapper.vm.$nextTick();

    expect(store.state.race.running).toBe(true);

    await wrapper.vm.startRace();
    expect(store.commit).toHaveBeenCalledWith("addRunResultWithFinishTimes", expect.any(Object));

    store.state.race.running = false;
    await wrapper.vm.$nextTick();
    expect(store.commit).toHaveBeenCalledWith("setRaceFinished", true);
  });
});
