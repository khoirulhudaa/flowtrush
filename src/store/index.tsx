// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import workSpaceSlice from './workSpaceSlice';
import boardSlice from './boardSlice';
import taskSlice from './taskSlice';

const rootReducer = combineReducers({
    authSlice,
    workSpaceSlice,
    boardSlice,
    taskSlice
});

export default rootReducer;
