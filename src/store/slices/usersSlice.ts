import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "../thunks/fetchUsers";
import { addUserThunk } from "../thunks/addUser";
import { removeUserThunk } from '../thunks/removeUser';

interface User {
    id: number,
    name: string
}

const initialState = {
    data: [] as Array<User>,
    isLoading: false,
    error: null as object | null,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        //FETCHING USERS
        builder.addCase(fetchUsersThunk.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchUsersThunk.fulfilled, (state, action)=>{
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUsersThunk.rejected, (state, action)=>{
            state.error = action.error;
            state.isLoading = false;
        });

        //ADDING USER
        builder.addCase(addUserThunk.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(addUserThunk.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addUserThunk.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error;
        });

        //REMOVING USER
        builder.addCase(removeUserThunk.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(removeUserThunk.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = state.data.filter((user)=>user.id !== action.payload);
            
        });
        builder.addCase(removeUserThunk.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const usersReducer = usersSlice.reducer;