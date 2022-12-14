import {createSlice} from "@reduxjs/toolkit";


const initialState={
    currentVideo:null,
    loading:false,
    error:false
}


export const videoSlice=createSlice({
    name:"video",
    initialState,
    reducers:{
        fetchStart:(state,action)=>{
            state.loading=true;
        },
        fetchSuccess:(state,action)=>{
            state.loading=false;
            state.currentVideo=action.payload;

        },
        fetchFailure:(state,action)=>{
            state.loading=false;
            state.error=true;
        },
        likeVideo:(state,action)=>{
            if(!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex(userId=>userId===action.payload),1);
            }
        },
        dislikeVideo:(state,action)=>{
            if(!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex(userId=>userId===action.payload),1);
            }
        }
    }
})


export const {fetchStart,fetchSuccess,fetchFailure,likeVideo,dislikeVideo}=videoSlice.actions;

export default videoSlice.reducer;

