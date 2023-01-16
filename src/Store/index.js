import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
    },
    reducers: {
        login(state, action) {
            state.username = action.payload;
        },
        logout(state) {
            state.username = null;
        },
    },
});

export const userActions = userSlice.actions;
export const store = configureStore({
    reducer: userSlice.reducer,
});
