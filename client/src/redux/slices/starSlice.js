

import {createSlice} from '@reduxjs/toolkit'

const colorSlice=createSlice({
    name:'starColor',
    initialState:"cyan",
    reducers:{
        changeColor:(state,action)=>{
            return state=state==="cyan" ? "red" : "cyan"
        }
    }
})

export const {changeColor}=colorSlice.actions
export default colorSlice.reducer;