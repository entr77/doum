import { configureStore, createSlice } from '@reduxjs/toolkit'

let contract = createSlice({
  name : 'contract',
  initialState : {image:'',address:''  },
  reducers: {
    changeState(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    }
  }
}) 


export const { changeState } = contract.actions;
export default contract