
import {createSlice} from '@reduxjs/toolkit'

// SLICE FOR CHANGE THE ROTATE VALUE
const rotateSlice=createSlice({
    name:'rotate',
    initialState:false,
    reducers:{
        rotate:(state,action)=>{
            return state=!state
        }
    }
})
export const {rotate} = rotateSlice.actions;

export default rotateSlice.reducer;