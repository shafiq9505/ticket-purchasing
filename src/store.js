import { configureStore, combineReducers } from "@reduxjs/toolkit";
import creditCardReducer from "./components/creditCard/creditCardSlice";
import homeReducer from "./pages/home/homeSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  creditCard: creditCardReducer,
  home : homeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
