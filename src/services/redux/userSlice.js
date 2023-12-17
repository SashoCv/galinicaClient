import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLogged: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isLogged = action.payload.isLogged;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLogged = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;