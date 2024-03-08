import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useColorScheme } from '@mui/joy/styles'
import { Tooltip, IconButton } from '@mui/joy'
import { DarkModeRounded as DarkModeRoundedIcon, LightModeRounded as LightModeRoundedIcon } from '@mui/icons-material'

function ColorSchemeToggle() {
	const { mode, setMode } = useColorScheme()
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) {
		return <IconButton size="sm" variant="outlined" color="primary" />
	}
	return (
		<Tooltip title="Change theme" variant="outlined">
			<IconButton
				id="toggle-mode"
				size="sm"
				variant="plain"
				color="neutral"
				sx={{ alignSelf: 'center' }}
				onClick={() => {
					if (mode === 'light') {
						setMode('dark')
					} else {
						setMode('light')
					}
				}}
			>
				{mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
			</IconButton>
		</Tooltip>
	)
}

const Header = () => {
	const account = useSelector((state) => state.account.account)

	return (
		<header>
			<section>
				<NavLink to="/">
					<strong style={{ color: 'var(--joy-palette-text-secondary, var(--joy-palette-neutral-700, #32383E))' }}>
						LOGO
					</strong>
				</NavLink>
				<div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
					{account ? (
						<>
							<small>{account.email}</small>
							<span>&nbsp;—&nbsp;</span>
							<NavLink to="/auth/logout">
								<small>logout</small>
							</NavLink>
						</>
					) : (
						<small>Not logged in</small>
					)}
					<span>&nbsp;|&nbsp;</span>
					<ColorSchemeToggle />
				</div>
			</section>
		</header>
	)
}

export default Header
