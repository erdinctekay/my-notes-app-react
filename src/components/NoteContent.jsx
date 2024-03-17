import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectNote } from '@/features/notes/notesSlice'

import { Box, Sheet, Typography, Button, Input, Snackbar } from '@mui/joy'
import {
	DeleteRounded as DeleteRoundedIcon,
	Save as SaveIcon,
	Report as ReportIcon,
	FindInPage as FindInPageIcon,
} from '@mui/icons-material'
import { useGetOneNoteQuery, useUpdateNoteMutation, useDeleteNoteMutation } from '@/services/notesApi'

import moment from 'moment'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function NoteContent() {
	const dispatch = useDispatch()
	const selectedNote = useSelector((state) => state.notes.selected)
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [note, setNote] = useState({ title: '', content: '', created_at: '', updated_at: '' })

	const {
		data: { item } = { item: {} },
		isSuccess: itemSuccess,
		error: itemError,
		isFetching: itemFetching,
		isLoading: itemLoading,
	} = useGetOneNoteQuery(selectedNote, { skip: !selectedNote })

	const [updateNote, { isLoading: updateLoading, error: updateError }] = useUpdateNoteMutation()
	const [deleteNote, { isLoading: deleteLoading, error: deleteError }] = useDeleteNoteMutation()

	const saveNote = async () => {
		try {
			const { item } = await updateNote({ ...note, _id: selectedNote }).unwrap()
			// console.log(res)
		} catch (err) {
			console.error(err)
		}
	}

	const removeNote = async () => {
		try {
			const { item } = await deleteNote(selectedNote).unwrap()
			dispatch(selectNote(null))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		if (selectedNote) document.querySelector('.ql-container .ql-editor').classList.add('scrollable')
	}, [selectedNote])

	useEffect(() => {
		if (!!updateError || !!deleteError) setOpenSnackbar(true)
	}, [updateError, deleteError])

	useEffect(() => {
		if (itemSuccess && !itemFetching) {
			setNote({
				title: item.title,
				content: item.content,
				created_at: item.created_at,
				updated_at: item.updated_at,
			})
		}
	}, [itemSuccess, itemFetching, itemError, item, selectedNote])

	const handleSnackbarClose = (event, reason) => {
		if (reason !== 'clickaway') setOpenSnackbar(false)
	}

	return (
		<Sheet
			variant="outlined"
			sx={{
				borderRadius: 'sm',
				width: 'calc(100vw - 360px)',
				borderTop: 'none',
				backgroundColor: 'transparent',
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

			{!selectedNote ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'calc(100dvh - 60px)',
						width: '100%',
					}}
				>
					<FindInPageIcon sx={{ fontSize: '6rem', color: 'text.secondary', mb: 2, mt: '-5%' }} />

					<Typography variant="h6" color="textSecondary" style={{ fontWeight: '600', fontSize: '1rem' }}>
						{'Select a note to view or edit'}
					</Typography>
				</Box>
			) : (
				<>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
							py: '11px',
							px: '2rem',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								width: 'calc(100% - 210px)',
							}}
						>
							<Input
								color="neutral"
								placeholder=""
								variant="soft"
								value={note.title}
								onChange={(e) =>
									setNote((prevNote) => ({
										...prevNote,
										title: e.target.value,
									}))
								}
								sx={{
									backgroundColor: 'transparent',
									fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-lg, 1.125rem))',
									fontWeight: 'var(--joy-fontWeight-lg, 600)',
									color: 'var(--joy-palette-text-primary)',
									boxShadow: 'none',
									'&:focus-within::before': { boxShadow: 'none !important' },
									'--Input-paddingInline': '0',
									my: -0.75,
								}}
								slotProps={{
									input: {
										maxLength: 50,
									},
								}}
							/>
							<Typography level="body-xs" textColor="text.tertiary">
								{item.created_at && (
									<small>
										last save:
										<Typography textColor="text.primary">
											{' '}
											{note.updated_at ? moment(note.updated_at).format('DD/MM/YYYY HH:mm') : 'DD/MM/YYYY HH:mm'}
										</Typography>{' '}
										— created at:
										<Typography textColor="text.primary">
											{' '}
											{note.created_at ? moment(note.created_at).format('DD/MM/YYYY HH:mm') : 'DD/MM/YYYY HH:mm'}
										</Typography>
									</small>
								)}
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								height: '32px',
								flexDirection: 'row',
								justifyContent: 'flex-end',
								gap: 0,
								width: '180px',
							}}
						>
							<Button
								size="sm"
								variant="plain"
								color="neutral"
								startDecorator={<SaveIcon />}
								onClick={saveNote}
								loading={updateLoading}
							>
								Save
							</Button>
							<Button
								size="sm"
								variant="plain"
								color="danger"
								startDecorator={<DeleteRoundedIcon />}
								onClick={removeNote}
								loading={deleteLoading}
							>
								Delete
							</Button>
						</Box>
					</Box>
					<ReactQuill
						theme="snow"
						value={note.content}
						onChange={(value) => setNote((prevNote) => ({ ...prevNote, content: value }))}
					/>
				</>
			)}
		</Sheet>
	)
}
