import { Stack, Typography } from '@mui/material';
import { SubmitButton } from '../../styles/button';
interface FeedbackProps {
	showButton?: boolean;
	imageLink: string;
	header: string;
	content: string;
	continueUrl: string;
	onMFASetupClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const FeedbackContent = ({
	header,
	content,
	continueUrl,
	onMFASetupClick,
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
						<SubmitButton href={continueUrl}> Sign In </SubmitButton>
						<SubmitButton onClick={onMFASetupClick}> Setup 2FA </SubmitButton>
					</Stack>
				)}
			</>
		</Stack>
	);
};

export default FeedbackContent;
