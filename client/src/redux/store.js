
import {configureStore}  from '@reduxjs/toolkit'
import rotateReducer from './slices/roboSlice'
import colorReducer from './slices/starSlice'

export const store=configureStore({
    reducer:{
       rotate:rotateReducer,
       starColor:colorReducer
    }
});