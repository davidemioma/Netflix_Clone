import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
  name: "ui",
  initialState: {
    moviePlayerOpen: false,
    currentMovie: null,
  },
  reducers: {
    setCurrentMovie(state, action) {
      state.currentMovie = action.payload;
    },

    openMoviePlayer(state) {
      state.moviePlayerOpen = true;
    },

    closeMoviePlayer(state) {
      state.moviePlayerOpen = false;
    },
  },
});

export const currentMovieSelector = (state: any) => state.ui.currentMovie;

export const moviePlayerSelector = (state: any) => state.ui.moviePlayerOpen;

export default UiSlice;
