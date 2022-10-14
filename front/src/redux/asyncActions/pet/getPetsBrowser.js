import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const API_ROUTE = import.meta.env.VITE_APP_API_ROUTE

export const getPetsBrowser = createAsyncThunk(
    'pets/getAll/',
    async (browser = {}) => {
        try {
            return await axios.get(
                `${API_ROUTE}/pets/getAll/${browser.type}?species=${browser.filter.species}&gender=${browser.filter.gender}&city=${browser.filter.city}&date=${browser.filter.date}&name=${browser.filter.name}&color=${browser.filter.color}&size=${browser.filter.size}`
                // `${API_ROUTE}/pets/getAll/${browser.type}?species=${browser.filter.species}&gender=${browser.filter.gender}&city=${browser.filter.city}&date=${browser.filter.date}&name=${browser.filter.name}&color=${browser.filter.color}&size=${browser.filter.size}?status=${browser.filter.isReunited}`
            )
        } catch (err) {
            console.log(err)
        }
    }
)

export const extraGetPetsBrowser = {
    [getPetsBrowser.pending]: (state) => {
        state.status = 'loading'
    },
    [getPetsBrowser.fulfilled]: (state, action) => {
        if (action.payload.statusText === 'No Content') {
            console.log(action.payload.statusText);
        }
        if (action.payload.data.type === 'Lost') {
            state.statusPets = 'success'
            state.LostPetsData = action.payload.data
        } else {
            state.FoundPetsData = action.payload.data
            state.statusPets = 'success'
        }
    },
    [getPetsBrowser.rejected]: (state) => {
        state.status = 'failed'
    },
}
