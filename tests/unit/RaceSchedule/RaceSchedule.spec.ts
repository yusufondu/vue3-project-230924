import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import RaceSchedule from "@/components/RaceSchedule/RaceSchedule.vue";
import DynamicTable from "@/components/shared/DynamicTable.vue";

const schedule = [
  {
    distance: 1200,
    horses: [
      { id: 1, horseName: "Horse 1", color: "rgb(102, 255, 51);" },
      { id: 2, horseName: "Horse 2", color: "rgb(102, 255, 52);" },
    ],
  },
  {
    distance: 1400,
    horses: [
      { id: 3, horseName: "Horse 3", color: "rgb(102, 255, 53);" },
      { id: 4, horseName: "Horse 4", color: "rgb(102, 255, 54);" },
    ],
  },
];

const store = createStore({
  getters: {
    raceSchedule: () => schedule,
  },
});

describe("RaceSchedule.vue", () => {
  it("renders schedule with correct data", () => {
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    const runHeaders = wrapper.findAll("h3");
    expect(runHeaders).toHaveLength(schedule.length);

    runHeaders.forEach((header, index) => {
      const expectedText = `${index + 1}ST Lap ${schedule[index].distance}m`;
      expect(header.text()).toBe(expectedText);
    });

    const raceRunTables = wrapper.findAllComponents(DynamicTable);
    expect(raceRunTables).toHaveLength(schedule.length);

    raceRunTables.forEach((table, index) => {
      const expectedData = schedule[index].horses.map((horse, i) => [
        i + 1,
        { value: horse.horseName, color: horse.color },
      ]);
      expect(table.props("data")).toEqual(expectedData);
    });
  });

  it("renders the Program header", () => {
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    const header = wrapper.find("h2");
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("Program");
  });
});
