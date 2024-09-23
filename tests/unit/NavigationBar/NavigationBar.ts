import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import NavigationBar from "@/components/RaceControls/NavigationBar.vue";
import DynamicButton from "@/components/shared/DynamicButton.vue";

describe("NavigationBar.vue", () => {
  let store: Store<any>;

  beforeEach(() => {
    store = createStore({
      state: {
        isRunning: false,
        isGenerated: false,
      },
      getters: {
        isRaceRunning: (state) => state.isRunning,
        isGenerated: (state) => state.isGenerated,
      },
      actions: {
        generateHorses: jest.fn(),
        generateSchedule: jest.fn(),
        startRace: jest.fn(),
        stopRace: jest.fn(),
      },
    });
  });

  it("calls generateSchedule action when Generate Program button is clicked", async () => {
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [store],
      },
    });

    const generateButton = wrapper.findComponent(DynamicButton);
    await generateButton.trigger("click");

    expect(store.dispatch).toHaveBeenCalledWith("generateSchedule");
  });

  it("calls startRace or stopRace action based on isRunning state", async () => {
    store.state.isRunning = false;
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [store],
      },
    });
  
    const raceButtons = wrapper.findAllComponents(DynamicButton);
    
    if (raceButtons.length > 1) {
      const raceButton = raceButtons[1];
      
      await raceButton.trigger("click");
      expect(store.dispatch).toHaveBeenCalledWith("startRace");
  
      store.state.isRunning = true;
      await wrapper.setData({});
  
      await raceButton.trigger("click");
      expect(store.dispatch).toHaveBeenCalledWith("stopRace");
    } else {
      throw new Error("Race button not found");
    }
  });
  

  it("disables GenerateButton when isRunning or isGenerated is true", async () => {
    store.state.isRunning = true;
    store.state.isGenerated = true;

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [store],
      },
    });

    const generateButton = wrapper.findComponent(DynamicButton);
    expect(generateButton.props("isDisabled")).toBe(true);
  });

  it("enables GenerateButton when isRunning and isGenerated are false", async () => {
    store.state.isRunning = false;
    store.state.isGenerated = false;

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [store],
      },
    });

    const generateButton = wrapper.findComponent(DynamicButton);
    expect(generateButton.props("isDisabled")).toBe(false);
  });
});
