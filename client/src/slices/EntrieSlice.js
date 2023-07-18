import {createSlice}  from "@reduxjs/toolkit";

const initialState={
    entrie : null,
    loading:false,
    editEntry: false,
}



const EntrieSlice = createSlice({
    name:"entrie",
    initialState:initialState,
    reducers:{
        setEntriesData(state,action){
            state.entrie  = action.payload;
        },
        setEditEntries(state,action){
            state.editEntry = action.payload;
        },
        setLoading(state,action){
            state.loading = action.payload
        }
    }
});

export const {setEntriesData,setLoading} = EntrieSlice.actions;
export default EntrieSlice.reducer;