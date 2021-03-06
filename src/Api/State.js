import { List, fromJS } from "immutable";

const STATE_KEY = "inverseListState";

export const initialState = {
  sampleSize: "",
  listItems: List(),
  generateButtonEnabled: true
};

export const saveState = state => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const localState = JSON.parse(localStorage.getItem(STATE_KEY));

  return localState
    ? {
        sampleSize: localState.sampleSize,
        generateButtonEnabled: localState.generateButtonEnabled || true,
        listItems: fromJS(localState.listItems)
      }
    : initialState;
};
