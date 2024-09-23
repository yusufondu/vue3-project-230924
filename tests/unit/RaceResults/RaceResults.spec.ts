import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import RaceResults from "@/components/RaceResult/RaceResults.vue";
import DynamicTable from "@/components/shared/DynamicTable.vue";

interface Horse {
  id: number;
  horseName: string;
  color: string;
  finishTime: number;
}

interface Run {
  horses: Horse[];
}

interface State {
  raceResults: Run[];
}

describe("RaceResults.vue", () => {
  let store: Store<State>;

  beforeEach(() => {
    store = createStore<State>({
      getters: {
        raceResults: () => [
          [
            { id: 1, horseName: "Horse 1", color: "rgb(102, 255, 51);", finishTime: 60.12 },
            { id: 2, horseName: "Horse 2", color: "rgb(102, 255, 52);", finishTime: 62.34 },
          ],
          [
            { id: 3, horseName: "Horse 3", color: "rgb(102, 255, 53);", finishTime: 64.56 },
            { id: 4, horseName: "Horse 4", color: "rgb(102, 255, 54);", finishTime: 66.78 },
          ],
        ],
      },
    });
  });

  it("renders the results correctly", () => {
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store],
      },
    });

    const headers = wrapper.findAll("h3");
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];
    
    headers.forEach((header, index) => {
      const expectedText = `${index + 1}ST Lap ${distances[index]}m`;
      expect(header.text()).toBe(expectedText);
    });

    const resultTables = wrapper.findAllComponents(DynamicTable);
    expect(resultTables).toHaveLength(2);
  });

  it("sorts the results correctly", () => {
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store],
      },
    });

    const sortedResults = (wrapper.vm as any).sortedResults;

    expect(sortedResults[0][0].finishTime).toBeLessThan(sortedResults[0][1].finishTime);

    expect(sortedResults[1][0].finishTime).toBeLessThan(sortedResults[1][1].finishTime);
  });
});
