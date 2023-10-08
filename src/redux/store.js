import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baydinApi } from "./api/baydinApi";
import baydinSlice from "./services/baydinSlice";

export const store = configureStore({
  reducer: {
    [baydinApi.reducerPath]: baydinApi.reducer,
    baydinSlice: baydinSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        baydinApi.middleware),
});

setupListeners(store.dispatch);