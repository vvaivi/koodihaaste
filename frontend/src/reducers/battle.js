import { createSlice } from "@reduxjs/toolkit";
import battleService from "../services/battle";
import { setNotification } from "./notification";

const slice = createSlice({
  name: "battle",
  initialState: {
    player1: null,
    player2: null,
  },
  reducers: {
    addPlayer1(state, { payload }) {
      return { ...state, player1: payload };
    },
    addPlayer2(state, { payload }) {
      return { ...state, player2: payload };
    },
    removePlayer1(state) {
      return { ...state, player2: null };
    },
    removePlayer2(state) {
      return { ...state, player2: null };
    },
  },
});

export const { addNew, addPlayer1, addPlayer2, removePlayer1, removePlayer2, getPlayer1Name, getPlayer2Name } =
  slice.actions;

export const createBattle = (battle) => {
  return async (dispatch) => {
    battleService
      .create(battle)
      .then((response) => {
        dispatch(addNew(response));
        dispatch(
          setNotification({
            message: `Battle selected`,
            type: "info",
          })
        );
      })
      .catch((error) => {
        dispatch(
          setNotification({
            message: "selecting a battle failed: " + error.response.data.error,
            type: "alert",
          })
        );
      });
  };
};

export default slice.reducer;
