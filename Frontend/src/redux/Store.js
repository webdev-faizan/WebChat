import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = configureStore(
  {
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  },
  applyMiddleware(thunk)
);
