

import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { useState, useEffect } from 'react';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const messages = [
	'klubiq is loading...',
	'Preparing your dashboard...',
	'Almost there...',
	'Just a moment...',
];

const Loader = () => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		const currentText = messages[messageIndex] || ''; // Add fallback empty string
		const speed = isDeleting ? 50 : 150;

		if (!isDeleting && currentMessage === currentText) {
			setTimeout(() => setIsDeleting(true), 1000);
			return;
		}

		if (isDeleting && currentMessage === '') {
			setIsDeleting(false);
			setMessageIndex((prev) => (prev + 1) % messages.length);
			return;
		}

		const timer = setTimeout(() => {
			if (isDeleting) {
				setCurrentMessage(currentText.substring(0, currentIndex - 1));
				setCurrentIndex(currentIndex - 1);
			} else {
				setCurrentMessage(currentText.substring(0, currentIndex + 1));
				setCurrentIndex(currentIndex + 1);
			}
		}, speed);

		return () => clearTimeout(timer);
	}, [currentMessage, currentIndex, isDeleting, messageIndex]);

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					variant='h5'
					sx={{
						color: 'primary.main',
						'&::after': {
							content: '"|"',
							animation: `${blink} 1s step-end infinite`,
							marginLeft: '2px',
						},
					}}
				>
					{currentMessage}
				</Typography>
			</Box>
		</Box>
	);
};

export default Loader;
