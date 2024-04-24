import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:null,
}

export const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
      loadperson: (state, action) => {
        state.info = action.payload;
      },
      removeperson: (state, action) => {
        state.info = null;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loadperson, removeperson } = tvSlice.actions
  
  export default tvSlice.reducer;