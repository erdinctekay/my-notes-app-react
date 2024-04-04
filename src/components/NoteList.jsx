import { Fragment, useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectNote, changePage } from '@/features/notes/notesSlice'

import {
	Box,
	Typography,
	List,
	ListDivider,
	ListItem,
	ListItemButton,
	listItemButtonClasses,
	Input,
	Chip,
	IconButton,
	Button,
	CircularProgress,
	Snackbar,
} from '@mui/joy'

import {
	SearchRounded as SearchRoundedIcon,
	CloseRounded as CloseRoundedIcon,
	AddRounded as AddRoundedIcon,
	Report as ReportIcon,
} from '@mui/icons-material'

import {
	useListNotesQuery,
	useCreateNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
} from '@/services/notesApi'

import moment from 'moment'
import DOMPurify from 'dompurify'

const NoteList = () => {
	const selectedNote = useSelector((state) => state.notes.selected)
	const page = useSelector((state) => state.notes.page)
	const take = 10

	const dispatch = useDispatch()
	const [showSearchInput, setShowSearchInput] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const searchInputRef = useRef(null)
	const [createNote, { isLoading: createLoading, error: createError }] = useCreateNoteMutation()

	const {
		data: { items: notes, count } = { items: [], count: 0 },
		isSuccess: listSuccess,
		isFetching: listFetching,
		isLoading: listLoading,
		error: listError,
	} = useListNotesQuery({ skip: (page - 1) * take, take })

	useEffect(() => {
		if (!!createError || !!listError) setOpenSnackbar(true)
	}, [createError, listError])

	useEffect(() => {
		if (!listFetching && listSuccess && notes.length === 0 && count > 0) {
			dispatch(changePage(page - 1))
		}
	}, [listSuccess, listFetching, dispatch, notes, selectedNote, count, page])

	const handleSnackbarClose = (event, reason) => {
		if (reason !== 'clickaway') setOpenSnackbar(false)
	}

	const addNewItem = async () => {
		const newNote = {
			title: 'New untitled note',
			content: '',
		}
		try {
			const { item } = await createNote(newNote).unwrap()
			dispatch(changePage(1))
			dispatch(selectNote(item._id))
		} catch (err) {
			console.error(err)
		}
	}

	const handleSearchClear = () => {
		setSearchValue('')
		if (showSearchInput) searchInputRef.current.focus()
	}

	const handleSearch = (event) => {
		setSearchValue(event.target.value)
	}

	const handleShowSearchInput = () => {
		setShowSearchInput(!showSearchInput)
		if (!showSearchInput) {
			setTimeout(() => {
				searchInputRef.current.focus()
			}, 0)
		} else {
			handleSearchClear()
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '360px',
				'--list-actions-height': showSearchInput ? '115px' : '65px',
			}}
		>
			<Snackbar
				autoHideDuration={1500}
				color="danger"
				variant="solid"
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				startDecorator={<ReportIcon />}
				open={openSnackbar}
				onClose={handleSnackbarClose}
			>
				{'Something went wrong'}
			</Snackbar>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					px: '24px',
					py: '16px',
					borderBottom: 'var(--border)',
				}}
			>
				<Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
					<Chip variant="soft" color="neutral" size="md" slotProps={{ root: { component: 'span' } }}>
						<Typography level="body-xs" textColor="text.tertiary">
							{count === 1 ? `${count} note found` : `${count} notes found`}
						</Typography>
					</Chip>
					<Box sx={{ display: 'flex', gap: 0.5 }}>
						<IconButton size="sm" color="neutral" variant="soft" onClick={handleShowSearchInput}>
							<SearchRoundedIcon />
						</IconButton>
						<IconButton size="sm" color="primary" variant="soft" onClick={addNewItem} loading={createLoading}>
							<AddRoundedIcon />
						</IconButton>
					</Box>
				</Box>
				<Input
					sx={{ display: showSearchInput ? 'flex' : 'none' }}
					slotProps={{ input: { ref: searchInputRef } }}
					size="sm"
					startDecorator={<SearchRoundedIcon />}
					endDecorator={
						<IconButton variant="plain" color="neutral" size="sm" onClick={handleSearchClear}>
							<CloseRoundedIcon />
						</IconButton>
					}
					placeholder="Search"
					aria-label="Search"
					value={searchValue}
					onChange={handleSearch}
				/>
			</Box>
			<List
				sx={{
					padding: '0 !important',
					margin: '0 !important',
					[`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
						borderLeft: '4px solid',
						borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
					},
				}}
			>
				<div className="scrollable scroll-y" style={{ height: 'calc(100dvh - 60px - var(--list-actions-height))' }}>
					{(listLoading || listFetching) && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100%',
								width: '100%',
							}}
						>
							<CircularProgress color="primary" determinate={false} size="lg" value={25} variant="soft" />
						</div>
					)}

					{listError && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100%',
								width: '100%',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<Chip variant="soft" color="danger" size="lg" slotProps={{ root: { component: 'span' } }}>
									Error while fetching notes
								</Chip>
								<Typography level="body-sm" textColor="text.tertiary" sx={{ pt: 1 }}>
									<strong>{listError?.message || 'Something went wrong'}</strong>
								</Typography>
							</div>
						</div>
					)}

					{listSuccess && (
						<>
							{notes.length === 0 ? (
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										width: '100%',
									}}
								>
									<Typography level="body-sm" textColor="text.tertiary">
										No notes found
									</Typography>
								</div>
							) : (
								<>
									{notes.map((item) => (
										<Fragment key={item._id}>
											<ListItem>
												<ListItemButton
													{...(item._id === selectedNote && {
														selected: true,
														color: 'neutral',
													})}
													sx={{ p: 2, borderLeft: '4px solid transparent' }}
													className="note-list-item"
													onClick={() =>
														selectedNote !== item._id ? dispatch(selectNote(item._id)) : dispatch(selectNote(null))
													}
												>
													<Box sx={{ pl: 1, width: '100%' }}>
														<Box
															sx={{
																display: 'flex',
																justifyContent: 'space-between',
																mb: 0.5,
															}}
														>
															<Typography level="title-sm" className="text-clamp clamp-2" sx={{ mb: 0.5 }}>
																{item.title}
															</Typography>
															<Typography
																level="body-xs"
																textColor="text.tertiary"
																sx={{
																	textWrap: 'nowrap',
																}}
															>
																{moment(item.updated_at).format('DD/MM/YYYY HH:mm')}
															</Typography>
														</Box>
														<div>
															<Typography
																level="body-xs"
																className="text-clamp clamp-3"
																style={{
																	fontWeight: 'normal',
																	minHeight: '21px',
																}}
															>
																<div
																	dangerouslySetInnerHTML={{
																		__html: DOMPurify.sanitize(item.content.replace(/<[^>]*>/g, ' ')),
																	}}
																/>
															</Typography>
														</div>
													</Box>
												</ListItemButton>
											</ListItem>
											<ListDivider sx={{ m: 0 }} />
										</Fragment>
									))}
									{Math.ceil(count / take) > 1 && (
										<div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 1rem' }}>
											<Button
												variant="soft"
												color="primary"
												size="sm"
												disabled={page === 1}
												onClick={() => dispatch(changePage(page - 1))}
											>
												Prev
											</Button>

											<Typography level="body-xs" textColor="text.tertiary" sx={{ py: 1 }}>
												<span style={{ fontWeight: 'bold' }}>
													{page} / {Math.ceil(count / take)}
												</span>{' '}
											</Typography>

											<Button
												variant="soft"
												color="primary"
												size="sm"
												disabled={page >= Math.ceil(count / take)}
												onClick={() => dispatch(changePage(page + 1))}
											>
												Next
											</Button>
										</div>
									)}
								</>
							)}
						</>
					)}
				</div>
			</List>
		</div>
	)
}

export default NoteList
