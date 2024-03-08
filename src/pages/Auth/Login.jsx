import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import { Sheet, Typography, FormControl, FormLabel, Input, Button, Snackbar, Switch } from '@mui/joy'
import { Report as ReportIcon } from '@mui/icons-material'

import { auth } from '@/services/firebase/index.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useDispatch } from 'react-redux'
import { login } from '../../features/account/accountSlice'

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(null)

	const handleLogin = async () => {
		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			const user = JSON.parse(JSON.stringify(res.user))
			dispatch(login(user))
			navigate('/dashboard')
		} catch (error) {
			setError(error.message.split('Firebase: ')[1])
		}
	}

	const handleSnackbarClose = () => {
		setError(null)
	}

	return (
		<section>
			{/* <ModeToggle /> */}
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
						<b>Welcome!</b>
					</Typography>
					<Typography level="body-sm">Login to your dashboard</Typography>
				</div>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						name="email"
						type="email"
						placeholder="johndoe@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						name="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormControl>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
					<Switch
						onChange={(e) => setShowPassword(e.target.checked)}
						startDecorator={
							<Typography component="label" fontSize="xs">
								See password
							</Typography>
						}
					/>
				</div>

				<Button sx={{ mt: 1 }} onClick={handleLogin}>
					Login
				</Button>
				<Typography
					endDecorator={<NavLink to="/auth/register">Register</NavLink>}
					fontSize="sm"
					sx={{ alignSelf: 'center' }}
				>
					Don&apos;t have an account?
				</Typography>
			</Sheet>
		</section>
	)
}

export default Login
