import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name : 'userSlice',
  initialState : [],
  reducers : {
    setData : (state,action)=>{
      return action.payload;
    },
    deleteUser : (state,action)=>{

    }
  }
})



const store = configureStore({
  reducer : {
    users : userSlice.reducer,
  }
})

export default store;
export const userAction = userSlice.actions;