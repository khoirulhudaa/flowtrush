import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authStates {
    auth: any,
    token: string
}

const initialState: authStates = {
    auth: {
        user_id: '',
        email: '',
        username: '',
        password: '',
        date: '',
    },
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSignIn: (state, action:PayloadAction<any>) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }   
        },
        authSignOut: (state) => {
            state.auth = initialState.auth,
            state.token = initialState.token
        },
        saveToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload
        },
    }
})

export const { authSignIn, authSignOut, saveToken } = authSlice.actions
export default authSlice.reducer