import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice.js"
import TodoSlice from "../slices/TodoSlice.js"

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        todo: TodoSlice
    }
})

export default store