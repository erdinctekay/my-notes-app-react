import { useState } from 'react'

import { Box, Sheet, Typography, Button, Input } from '@mui/joy'
import { DeleteRounded as DeleteRoundedIcon, Save as SaveIcon } from '@mui/icons-material'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function NoteContent() {
	const [note, setNote] = useState({
		title: 'Details for our Yosemite Park hike',
		content: `
				Hello, my friend!
				<br />
				<br />
				So, it seems we are getting there! Our trip is finally here. As you know, I love Yosemite National Park, a lot
				of great climbers and explorers have made history there, so I&apos;m very excited to bring you with me in this
				journey.
				<br />
				<br />
				There are plenty of amazing things to see there, from internationally recognized granite cliffs, waterfalls,
				clear streams, giant sequoia groves, lakes, mountains, meadows, glaciers, and a lot o biological diversity. It
				is amazing that almost 95 percent of the park is designated wilderness. Yosemite is one of the largest and least
				fragmented habitat blocks in the Serra Nevada, and the park supports a fantastic diversity of plants and
				animals.
				<br />
				<br />
				I really hope you love coming along with me, we will have an awesome time! I&apos;m attaching a few pics I took
				on the last time I went there-get excited!
				<br />
				<br />
				See you soon, Alex Jonnold`,
	})

	return (
		<Sheet
			variant="outlined"
			sx={{
				minHeight: 500,
				borderRadius: 'sm',
				py: 3,
				px: 4,
				mb: 3,
				width: 'calc(100vw - 360px)',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
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
						onChange={(e) => setNote({ ...note, title: e.target.value })}
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

					{/* <Typography level="title-lg" textColor="text.primary">
						Details for our Yosemite Park hike
					</Typography> */}

					<Typography level="body-xs" textColor="text.tertiary">
						<small>
							last save: <Typography textColor="text.primary">12/12/2021</Typography> — created at:
							<Typography textColor="text.primary"> 12/12/2021</Typography>
						</small>
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', height: '32px', flexDirection: 'row', gap: 0, width: '180px' }}>
					<Button size="sm" variant="plain" color="neutral" startDecorator={<SaveIcon />} onClick={() => null}>
						Save
					</Button>
					<Button size="sm" variant="plain" color="danger" startDecorator={<DeleteRoundedIcon />} onClick={() => null}>
						Delete
					</Button>
				</Box>
			</Box>

			<ReactQuill theme="snow" value={note.content} onChange={(value) => setNote({ ...note, content: value })} />
		</Sheet>
	)
}
