import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categories: [],
    minPrice:0,
    maxPice:0
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category !== action.payload);
    }
  ,
  setMinPrice:(state,action)=>{
    state.minPrice=action.payload

  },
  setMaxPrice:(state,action)=>{
    state.maxPrice=action.payload
  }}
});

export const { addCategory, removeCategory, setMinPrice,setMaxPrice } = filterSlice.actions;

export default filterSlice.reducer;
