import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './slices/Authslices'
import { apiSlice } from './slices/apiSlices'


const store=configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,

})

export default store