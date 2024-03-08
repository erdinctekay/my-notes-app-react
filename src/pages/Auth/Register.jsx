import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import { Sheet, Typography, FormControl, FormLabel, Input, Button, Snackbar, Chip, Switch } from '@mui/joy'
import { Report as ReportIcon } from '@mui/icons-material'

import { auth } from '@/services/firebase/index.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { useDispatch } from 'react-redux'
import { login } from '../../features/account/accountSlice'

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isPasswordOK, setIsPasswordOK] = useState({
		length: false,
		letter: false,
		number: false,
		symbol: false,
	})
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState(null)

	const checkIsPasswordOK = (password) => {
		setPassword(password)

		setIsPasswordOK({
			length: password.length >= 8,
			letter: /[a-zA-Z]/.test(password),
			number: /[0-9]/.test(password),
			symbol: /[^a-zA-Z0-9]/.test(password),
		})
	}

	const handleRegister = async () => {
		try {
			if (password.length > 0) {
				if (Object.values(isPasswordOK).some((value) => value === false))
					return setError('Error (auth/password-conditions-not-met).')

				if (password !== confirmPassword) return setError('Error (auth/password-confirm-error).')
			}

			const res = await createUserWithEmailAndPassword(auth, email, password)
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
						<b>Register</b>
					</Typography>
					<Typography level="body-sm">Create your account</Typography>
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
						onChange={(e) => checkIsPasswordOK(e.target.value)}
					/>
				</FormControl>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
					<Chip color={isPasswordOK.length ? 'success' : 'neutral'} size="sm" variant="soft" startDecorator="8 chars" />
					<Chip color={isPasswordOK.letter ? 'success' : 'neutral'} size="sm" variant="soft" startDecorator="letter" />
					<Chip color={isPasswordOK.number ? 'success' : 'neutral'} size="sm" variant="soft" startDecorator="number" />
					<Chip color={isPasswordOK.symbol ? 'success' : 'neutral'} size="sm" variant="soft" startDecorator="symbol" />
				</div>
				<FormControl>
					<FormLabel>Confirm Password</FormLabel>
					<Input
						name="confirm-password"
						type={showPassword ? 'text' : 'password'}
						placeholder="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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

				<Button sx={{ mt: 1 }} onClick={handleRegister}>
					Register
				</Button>
				<Typography endDecorator={<NavLink to="/auth/login">Login</NavLink>} fontSize="sm" sx={{ alignSelf: 'center' }}>
					Have an account?
				</Typography>
			</Sheet>
		</section>
	)
}

export default Register
