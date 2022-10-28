import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import Papa from "papaparse";

const config = {
  quotes: true,
  delimiter: " ",
  header: true,
  skipEmptyLines: true,
  columns: null,
};

const slice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    initialize(state, { payload }) {
      return payload;
    },
  },
});

export const initializeData = () => {
  return async (dispatch) => {
    //Data contains also other foods tha vegetables since there wasn't a good vegetable csv available
    fetch("../data.csv")
      .then((response) => response.text())
      .then((responseText) => {
        dispatch(initialize(Papa.parse(responseText, config)));
      });
  };
};

export const { initialize } = slice.actions;
export default slice.reducer;
