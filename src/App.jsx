import { useEffect, useState } from 'react'
import Router from './pages/router'
import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider, CssBaseline, CircularProgress } from '@mui/joy'
import Header from './components/Header'
import './App.css'

import { useDispatch } from 'react-redux'
import { auth } from './services/firebase'
import { login } from './features/account/accountSlice'

function App() {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) dispatch(login(JSON.parse(JSON.stringify(user))))
			setLoading(false)
		})

		return unsubscribe
	}, [dispatch])

	if (loading) {
		return (
			<CssVarsProvider>
				<CssBaseline />
				<div
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh', width: '100vw' }}
				>
					<CircularProgress color="primary" determinate={false} size="lg" value={25} variant="soft" />
				</div>
			</CssVarsProvider>
		)
	}

	return (
		<CssVarsProvider>
			<CssBaseline />
			<BrowserRouter>
				<Header />
				<main>
					<Router />
				</main>
			</BrowserRouter>
		</CssVarsProvider>
	)
}

export default App
