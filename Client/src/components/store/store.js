import { createBrowserHistory } from "history";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";

import userReducer from "../Authentication/UserReducer";

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    users: userReducer,
  },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
});

export default store;
