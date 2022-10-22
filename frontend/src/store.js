import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notification";
import vegetableReducer from "./reducers/vegetables";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    vegetables: vegetableReducer,
  },
});

export default store;
