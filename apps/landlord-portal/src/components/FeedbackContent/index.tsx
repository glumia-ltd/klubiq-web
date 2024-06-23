import { Stack, Typography, Button } from '@mui/material';

interface FeedbackProps {
	showButton?: boolean;
	imageLink: string;
	header: string;
	content: string;
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const FeedbackContent = ({
	header,
	content,
	onClick,
	imageLink,
	showButton = false,
}: FeedbackProps) => {
	return (
		<Stack
			alignItems={'center'}
			justifyContent='center'
			spacing={1}
			sx={{ minWidth: '650px' }}
		>
			<>
				{' '}
				<div style={{ marginBottom: '32px' }}>
					{imageLink && (
						<img src={imageLink} alt='logo' width={'100px'} height={'100px'} />
					)}
				</div>
				<div style={{ marginBottom: '20px' }}>
					<Typography align='center' fontSize={'30px'} fontWeight={700}>
						{header}
					</Typography>{' '}
				</div>
				<div style={{ marginBottom: '30px' }}>
					<Typography fontSize={'18px'} fontWeight={500} textAlign={'left'}>
						{content}
					</Typography>
				</div>
				{showButton && (
					<Button
						onClick={onClick}
						sx={{
							border: '1px solid #002147',
							color: 'white',
							background: '#002147',
							height: '40px',
							width: '90px',
							borderRadius: '8px',
							'&:hover': {
								color: '#002147',
								background: '#FFFFFF',
								cursor: 'pointer',
							},
						}}
					>
						Sign In
					</Button>
				)}
			</>
		</Stack>
	);
};

export default FeedbackContent;
