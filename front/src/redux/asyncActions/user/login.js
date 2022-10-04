import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const API_ROUTE = import.meta.env.VITE_APP_API_ROUTE

export const login = createAsyncThunk(
    'login/',
    async ({ email, password }) => {
        try {
            return await axios.post(`${API_ROUTE}/login`, {
                email,
                password,
            })
        } catch (err) {
            console.log(err)
        }
    }
)

export const extraLogin = {
    [login.pending]: (state) => {
        state.status = 'loading'
    },
    [login.fulfilled]: (state, action) => {
        state.status = 'success'
        state.isLogged = true
        state.isAdmin = action.payload.data.admin
        window.localStorage.setItem(
            'user',
            JSON.stringify(action.payload.data.token)
        )
        window.localStorage.setItem(
            'isAdmin',
            JSON.stringify(action.payload.data.admin)
        )
    },
    [login.rejected]: (state) => {
        state.status = 'failed'
        state.isLogged = false
    },
}