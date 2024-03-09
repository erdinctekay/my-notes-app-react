import { Fragment } from 'react'
import { Box, Typography, List, ListDivider, ListItem, ListItemButton, listItemButtonClasses } from '@mui/joy'

const data = [
	{
		name: 'Alex Jonnold',
		avatar: 'https://i.pravatar.cc/40?img=3',
		avatar2x: 'https://i.pravatar.cc/80?img=3',
		date: '21 Oct 2022',
		title: 'Details for our Yosemite Park hike and really really some very long title it is',
		body: 'Hello, my friend! So, it seems that we are getting there…',
		color: 'warning.400',
	},
	{
		name: 'Pete Sand',
		avatar: 'https://i.pravatar.cc/40?img=4',
		avatar2x: 'https://i.pravatar.cc/80?img=4',
		date: '06 Jul 2022',
		title: 'Tickets for our upcoming trip',
		body: 'Good day, mate! It seems that our tickets just arrived…',
		color: 'success.400',
	},
	{
		name: 'Kate Gates',
		avatar: 'https://i.pravatar.cc/40?img=5',
		avatar2x: 'https://i.pravatar.cc/80?img=5',
		date: '16 May 2022',
		title: 'Brunch this Saturday?',
		body: "Hey! I'll be around the city this weekend, how about a…",
		color: 'primary.500',
	},
	{
		name: 'John Snow',
		avatar: 'https://i.pravatar.cc/40?img=7',
		avatar2x: 'https://i.pravatar.cc/80?img=7',
		date: '10 May 2022',
		title: 'Exciting News!',
		body: 'Hello there! I have some exciting news to share with you...',
		color: 'danger.500',
	},
	{
		name: 'Michael Scott',
		avatar: 'https://i.pravatar.cc/40?img=8',
		avatar2x: 'https://i.pravatar.cc/80?img=8',
		date: '13 Apr 2022',
		title: 'Upcoming Product Launch',
		body: 'Dear customers and supporters, I am thrilled to announc...',
		color: 'danger.500',
	},
]

const NoteList = () => {
	return (
		<List
			sx={{
				padding: '0 !important',
				margin: '0 !important',
				[`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
					borderLeft: '5px solid',
					borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
				},
			}}
		>
			<div className="scrollable scroll-y" style={{ minHeight: 'calc(100vh - 60px)', width: '360px' }}>
				{data.map((item, index) => (
					<Fragment key={index}>
						<ListItem>
							<ListItemButton
								{...(index === 0 && {
									selected: true,
									color: 'neutral',
								})}
								sx={{ p: 2 }}
							>
								<Box sx={{ pl: 1, width: '100%' }}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											mb: 0.5,
										}}
									>
										<Typography level="title-sm" className="text-clamp clamp-2" sx={{ mb: 0.5, pr: 2 }}>
											{item.title}
										</Typography>
										<Typography
											level="body-xs"
											textColor="text.tertiary"
											sx={{
												textWrap: 'nowrap',
											}}
										>
											{item.date}
										</Typography>
									</Box>
									<div>
										<Typography
											level="body-sm"
											className="text-clamp clamp-2"
											sx={{
												fontWeight: 'normal',
											}}
										>
											{item.body}
										</Typography>
									</div>
								</Box>
							</ListItemButton>
						</ListItem>
						<ListDivider sx={{ m: 0 }} />
					</Fragment>
				))}
			</div>
		</List>
	)
}

export default NoteList
