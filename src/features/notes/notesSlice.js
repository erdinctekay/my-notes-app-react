import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
	name: 'notes',
	initialState: {
		selected: null,
		page: 1,
	},
	reducers: {
		selectNote: (state, action) => {
			state.selected = action.payload
		},
		changePage: (state, action) => {
			state.page = action.payload
		},
	},
})

export const { selectNote, changePage } = notesSlice.actions

export default notesSlice.reducer
