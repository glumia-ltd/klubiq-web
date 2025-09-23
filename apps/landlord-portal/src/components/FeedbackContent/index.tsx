import { Button, Stack, Typography } from '@mui/material';
interface FeedbackProps {
	showButton?: boolean;
	imageLink: string;
	header: string;
	content: string;
	continueUrl: string;
}
const FeedbackContent = ({
	header,
	content,
	continueUrl,
	imageLink,
	showButton = false,
}: FeedbackProps) => {
	return (
		<Stack
			direction={'column'}
			alignItems={'center'}
			justifyContent={'center'}
			spacing={2}
		>
			<>
				{' '}
				<div>
					{imageLink && (
						<img src={imageLink} alt='logo' width={'50px'} height={'50px'} />
					)}
				</div>
				<div>
					<Typography textAlign={'center'} variant='h3'>
						{header}
					</Typography>{' '}
				</div>
				<div>
					<Typography variant='body1' textAlign={'center'}>
						{content}
					</Typography>
				</div>
				{showButton && (
					<Stack width='100%' direction={'row'} spacing={1}>
						<Button
							href={continueUrl}
							fullWidth
							variant='klubiqMainButton'
						>
							Sign In
						</Button>
						{/* TODO: Disable for now so we can remove firebase from client side. Add 2FA setup button later */}
						{/* <Button
							onClick={onMFASetupClick}
							fullWidth
							variant='klubiqMainButton'
						>
							Setup 2FA
						</Button> */}
					</Stack>
				)}
			</>
		</Stack>
	);
};

export default FeedbackContent;
