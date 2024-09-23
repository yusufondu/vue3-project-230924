import { mount, flushPromises } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import HorseList from "@/components/HorseList/HorseList.vue";

interface Horse {
  id: number;
  condition: number;
  color: string;
}

interface State {
  horses: Horse[];
}

describe("HorseList.vue", () => {
  let store: Store<State>;

  const createVuexStore = (initialState: Horse[]) => {
    return createStore({
      state: { horses: initialState },
      getters: {
        horseList: (state: State) => state.horses,
      },
    });
  };

  it("renders a list of horses sorted by id", async () => {
    store = createVuexStore([
      { id: 2, condition: 90, color: "#33FF57" },
      { id: 1, condition: 70, color: "#FF5733" },
    ]);

    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    await flushPromises();

    const rows = wrapper.findAll("tr");
    expect(rows.length).toBe(3);
    expect(rows[1].text()).toContain("Name: 1");
    expect(rows[1].text()).toContain("Condition: 70");

    expect(rows[2].text()).toContain("Name: 2");
    expect(rows[2].text()).toContain("Condition: 90");
  });

  it("shows a message when there are no horses", async () => {
    store = createVuexStore([]);

    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("No horses available.");
  });
});
