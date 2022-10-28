import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notification";
import vegetableReducer from "./reducers/vegetables";
import battleReducer from "./reducers/battle";
import dataReducer from "./reducers/data";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    vegetables: vegetableReducer,
    battle: battleReducer,
    data: dataReducer,
  },
});

export default store;
