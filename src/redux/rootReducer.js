import { combineReducers } from '@reduxjs/toolkit'
import { themeReducer } from './reducer/themeSlice'

export const rootReducer = combineReducers({
  theme: themeReducer,
})
