import { mount, VueWrapper } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import { createStore, Store } from "vuex";

const NavigationBar = {
  name: "NavigationBar",
  template: '<div class="navigation-bar">Navigation Bar</div>',
};
const HorseList = {
  name: "HorseList",
  template: '<div class="horse-list">Horse List</div>',
};
const RaceSchedule = {
  name: "RaceSchedule",
  template: '<div class="race-schedule">Race Schedule</div>',
};
const RaceArea = {
  name: "RaceArea",
  template: '<div class="race-area">Race Area</div>',
};
const RaceResults = {
  name: "RaceResults",
  template: '<div class="race-results">Race Results</div>',
};

describe("HomeView.vue", () => {
  let store: Store<any>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore({
      state: {},
      getters: {},
    });

    wrapper = mount(HomeView, {
      global: {
        plugins: [store],
        components: {
          NavigationBar,
          HorseList,
          RaceSchedule,
          RaceArea,
          RaceResults,
        },
      },
    });
  });

  it("renders the header with NavigationBar", () => {
    const header = wrapper.find("header");
    expect(header.exists()).toBe(true);

    const navigationBar = wrapper.findComponent(NavigationBar);
    expect(navigationBar.exists()).toBe(true);
  });

  it("renders the main content areas", () => {
    const horseList = wrapper.findComponent(HorseList);
    const raceSchedule = wrapper.findComponent(RaceSchedule);
    const raceArea = wrapper.findComponent(RaceArea);
    const raceResults = wrapper.findComponent(RaceResults);

    expect(horseList.exists()).toBe(true);
    expect(raceSchedule.exists()).toBe(true);
    expect(raceArea.exists()).toBe(true);
    expect(raceResults.exists()).toBe(true);
  });

  it("renders HorseList, RaceSchedule, RaceArea, and RaceResults correctly", () => {
    const horseList = wrapper.findComponent(HorseList);
    const raceSchedule = wrapper.findComponent(RaceSchedule);
    const raceArea = wrapper.findComponent(RaceArea);
    const raceResults = wrapper.findComponent(RaceResults);

    expect(horseList.exists()).toBe(true);
    expect(raceSchedule.exists()).toBe(true);
    expect(raceArea.exists()).toBe(true);
    expect(raceResults.exists()).toBe(true);
  });
});
