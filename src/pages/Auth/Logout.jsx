import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Sheet, CssBaseline, Typography, Button, Snackbar } from '@mui/joy'
import { Report as ReportIcon } from '@mui/icons-material'

import { auth } from '@/services/firebase/index.js'
import { signOut } from 'firebase/auth'

import { useDispatch } from 'react-redux'
import { logout } from '../../features/account/accountSlice'

const Logout = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleLogout = async () => {
		try {
			setLoading(true)
			await signOut(auth)
			dispatch(logout())
			setLoading(false)
			navigate('/auth/login')
		} catch (error) {
			setError(error.message.split('Firebase: ')[1])
			setLoading(false)
		}
	}

	const handleSnackbarClose = () => {
		setError(null)
	}

	return (
		<section>
			<CssBaseline />
			<Sheet
				sx={{
					width: 320,
					mx: 'auto',
					my: 4,
					py: 3,
					px: 4,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					borderRadius: 'sm',
					boxShadow: 'md',
				}}
				variant="outlined"
			>
				<Snackbar
					autoHideDuration={1500}
					color="danger"
					variant="solid"
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					startDecorator={<ReportIcon />}
					open={!!error}
					onClose={handleSnackbarClose}
				>
					{error}
				</Snackbar>

				<div>
					<Typography level="h4" component="h1">
						<b>Logout</b>
					</Typography>
					<Typography level="body-sm">Do you want to proceed?</Typography>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
					<Button
						sx={{ mt: 1, width: '50%' }}
						color="neutral"
						variant="outlined"
						onClick={function () {
							navigate('/dashboard')
						}}
					>
						Return
					</Button>
					<Button sx={{ mt: 1, width: '50%' }} onClick={handleLogout} disabled={loading} loading={loading}>
						Logout
					</Button>
				</div>
			</Sheet>
		</section>
	)
}

export default Logout
