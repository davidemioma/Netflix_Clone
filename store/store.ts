import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: UiSlice.reducer,
  },
});

export const { openMoviePlayer, closeMoviePlayer, setCurrentMovie } =
  UiSlice.actions;

export default store;
