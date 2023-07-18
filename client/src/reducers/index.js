import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";
import EntrieSlice from "../slices/EntrieSlice";

const  rootReducer  =  combineReducers({
        auth:authSlice,
        entrie:EntrieSlice,
})

export default rootReducer;