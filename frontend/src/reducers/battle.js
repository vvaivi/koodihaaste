import { createSlice } from "@reduxjs/toolkit";
import battleService from "../services/battle";
import { setNotification } from "./notification";


const slice = createSlice({
  name: "battle",
  //initialState: [],
  reducers:{
    addNew(state, { payload }) {
      return state.concat(payload);
    }, /*
    add1(state) {
      state.battle[0] = action.payload
    },
    add2(state) {
      //ei tiiä tarvitaanko battle
      state.battle[1] = action.payload
    },
    remove1(state) {
      state[0] = null;
    },
    remove2(state) {
      state[0] = null;
    },
    get1(state) {
      return state.battle[0];
    },
    get2(state) {
      return state.battle[1];
    },*/
  },
});

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

const  {addNew, add1, add2, remove1, remove2}  = slice.actions;
export default slice.reducer;