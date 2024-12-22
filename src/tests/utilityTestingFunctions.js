import { createStore } from "redux";
export function mockStoreSimulation(storeState) {
  const store = createStore(() => ({
    auth: {
      isLoggedIn: storeState,
    },
  }));

  return store;
}
