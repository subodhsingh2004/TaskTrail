import { createSlice } from "@reduxjs/toolkit"

const getUserFromSessionStorage = () => {
    const user = sessionStorage.getItem("user") 
    return user ? JSON.parse(sessionStorage.getItem("user")) : null
}

const initialState = {
    status: getUserFromSessionStorage() == null ? false : true,
    user: getUserFromSessionStorage()
}

const AuthSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.status = true
            sessionStorage.setItem("user", JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.user = []
            state.status = false
            sessionStorage.clear("user")
        }
    }
})

export const { login, logout } = AuthSlice.actions
export default AuthSlice.reducer