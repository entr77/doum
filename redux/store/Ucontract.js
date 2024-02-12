import { configureStore, createSlice } from '@reduxjs/toolkit'

let Ucontract = createSlice({
  name : 'Ucontract',
  initialState : {image:'',address:''  },
  reducers: {
    UchangeState(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    }
  }
}) 



export const { UchangeState } = Ucontract.actions;
export default Ucontract