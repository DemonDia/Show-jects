import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
        id: null,
    },
    reducers: {
        login(state, action) {
            const {name,id} =  action.payload
            state.username = name;
            state.id = id
        },
        logout(state) {
            state.username = null;
            state.id = null;
        },
    },
});

export const userActions = userSlice.actions;
export const store = configureStore({
    reducer: userSlice.reducer,
});
