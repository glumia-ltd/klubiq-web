import { Link, Typography, Stack } from '@mui/material';

const NotFound = () => {
	return (
		<Stack
			direction={'column'}
			spacing={2}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Typography variant='h1'>404 Page Not Found!</Typography>
			<Typography
				variant='h2'
				sx={{
					fontSize: '1.5rem',
				}}
			>
				Oops! Looks like you've wandered off the property...
			</Typography>
			<Typography variant='body1'>
				It seems the page you're looking for doesn't exist. Maybe it's been
				leased, or perhaps it's just out of your reach!
			</Typography>
			<Typography variant='body2' fontSize={'1rem'} textAlign={'left'}>
				Here’s what you can do:
			</Typography>
			<Typography>
				1. Head back to the{' '}
				<Link href='/dashboard' underline='none' rel='noopener'>
					{'home page'}
				</Link>{' '}
				– Let’s find the right place together.
			</Typography>
			<Typography>
				2. Contact Support – If you need help locating something specific,{' '}
				<Link href='mailto:info@klubiq.com' underline='none' rel='noopener'>
					{'reach out to us.'}
				</Link>{' '}
			</Typography>
			<Typography>
				Don't worry, we’re here to make sure you’re always on the right path.
				🏠✨
			</Typography>
		</Stack>
	);
};

export default NotFound;
