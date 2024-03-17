import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import accountReducer from '@/features/account/accountSlice'
import notesReducer from '@/features/notes/notesSlice'
import { notesApi } from '@/services/notesApi'

export const store = configureStore({
	reducer: {
		account: accountReducer,
		notes: notesReducer,
		[notesApi.reducerPath]: notesApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
})

setupListeners(store.dispatch)
