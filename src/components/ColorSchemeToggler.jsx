import { useEffect, useState } from 'react'
import { useColorScheme } from '@mui/joy/styles'
import { Tooltip, IconButton } from '@mui/joy'
import { DarkModeRounded as DarkModeRoundedIcon, LightModeRounded as LightModeRoundedIcon } from '@mui/icons-material'

const ColorSchemeToggle = () => {
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

export default ColorSchemeToggle
