import { configureStore, createSlice } from '@reduxjs/toolkit'
import contract from './store/contract.js'
import Ucontract from './store/Ucontract.js'


export default configureStore({
  reducer: {
    contract : contract.reducer,
    Ucontract : Ucontract.reducer

  }
}) 
