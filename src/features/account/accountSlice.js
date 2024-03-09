import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
	name: 'account',
	initialState: {
		account: null,
	},
	reducers: {
		login: (state, action) => {
			state.account = action.payload
		},
		logout: (state) => {
			state.account = null
		},
	},
})

export const { login, logout } = accountSlice.actions

export default accountSlice.reducer
