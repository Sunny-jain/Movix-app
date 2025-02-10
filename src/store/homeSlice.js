import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genre: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      // console.log(action);
      state.url = action.payload;
      // console.log(state.url);
    },
    getGenres: (state, action) => {
      state.genre = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
