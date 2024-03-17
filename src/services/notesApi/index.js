import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const resource = 'notes'

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_NOTES_API_BASEURL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().account.account.stsTokenManager.accessToken
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),
	endpoints: (build) => ({
		listNotes: build.query({
			query: ({ skip, take }) => `${resource}?skip=${skip}&take=${take}`,
			// serializeQueryArgs: ({ endpointName }) => {
			// 	return endpointName
			// },
			// merge: (currentCache, res) => {
			// 	currentCache.items.push(...res.items)
			// },
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg
			},
			providesTags: (res) =>
				res?.items?.length > 0
					? [
							...res.items.map(({ id }) => ({
								type: 'Notes',
								id,
							})),
							{ type: 'Notes', id: 'LIST' },
					  ]
					: [{ type: 'Notes', id: 'LIST' }],
		}),
		getOneNote: build.query({
			query: (id) => `${resource}/${id}`,
			forceRefetch: () => true,
			providesTags: (res, error, id) => [{ type: 'Notes', id }],
		}),
		createNote: build.mutation({
			query: (item) => ({
				url: resource,
				method: 'POST',
				body: item,
			}),
			invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
		}),
		updateNote: build.mutation({
			query: (item) => ({
				url: `${resource}/${item._id}`,
				method: 'PATCH',
				body: item,
			}),
			invalidatesTags: (res, error, { id }) =>
				res.item
					? [
							{ type: 'Notes', id },
							{ type: 'Notes', id: 'LIST' },
					  ]
					: [{ type: 'Notes', id: 'LIST' }],
		}),
		deleteNote: build.mutation({
			query: (id) => ({
				url: `${resource}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
		}),
	}),
})

export const {
	useListNotesQuery,
	useGetOneNoteQuery,
	useCreateNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
} = notesApi
