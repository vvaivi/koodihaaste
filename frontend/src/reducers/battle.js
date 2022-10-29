import { createSlice } from "@reduxjs/toolkit";

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
      return { ...state, player1: null };
    },
    removePlayer2(state) {
      return { ...state, player2: null };
    },
  },
});

export const { addNew, addPlayer1, addPlayer2, removePlayer1, removePlayer2 } = slice.actions;

export default slice.reducer;
