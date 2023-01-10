import { createSlice } from "@reduxjs/toolkit";

import { MovieType } from "utils/types/movie";

interface StateType {
  favorites: MovieType[];
  loading: boolean;
}

const initialState: StateType = {
  favorites: [],
  loading: true,
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { setFavorites, setLoading } = sliceState.actions;
export default reducer;

/*
Fungsi reducer yaitu digunakan untuk melakukan perubahan sebuah data/state dari nilai awal (initial state) menjadi nilai yang diinginkan/baru yang bisa didapat dari sebuah variabel yang bernama payload(muatan).
*/
