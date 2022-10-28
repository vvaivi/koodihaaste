import { createSlice } from "@reduxjs/toolkit";
import vegetableService from "../services/vegetables";
import { setNotification } from "./notification";

const byWins = (v1, v2) => (v2.wins > v1.wins ? 1 : -1);

const slice = createSlice({
  name: "vegetable",
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload.sort(byWins);
    },
    addNew(state, { payload }) {
      return state.concat(payload).sort(byWins);
    },
    update(state, { payload }) {
      return state.map((v) => (v.id === payload.id ? payload : v)).sort(byWins);
    },
  },
});

export const initializeVeggies = () => {
  return async (dispatch) => {
    vegetableService.getAll().then((response) => {
      dispatch(initializeWith(response));
    });
  };
};

export const reactToVegetable = (vegetable, what) => {
  return async (dispatch) => {
    vegetableService.update(vegetable.id, vegetable).then((updated) => {
      dispatch(update(updated));
      dispatch(
        setNotification({
          message: `${vegetable.name} ${what}`,
          type: "info",
        })
      );
    });
  };
};

export const createVegetable = (vegetable) => {
  return async (dispatch) => {
    vegetableService
      .create(vegetable)
      .then((response) => {
        dispatch(addNew(response));
        dispatch(
          setNotification({
            message: `${vegetable.name} tallennettu`,
            type: "info",
          })
        );
      })
      .catch((error) => {
        dispatch(
          setNotification({
            message: "selecting a veggie failed: " + error.response.data.error,
            type: "alert",
          })
        );
      });
  };
};

const { initializeWith, addNew, update } = slice.actions;
export default slice.reducer;
