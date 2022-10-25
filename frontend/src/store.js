import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notification";
import vegetableReducer from "./reducers/vegetables";
import battleReducer from "./reducers/battle";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    vegetables: vegetableReducer,
    battle: battleReducer
  },
});

export default store;