// LOGO LOADER

import { Box } from '@mui/material';
// import Logo2 from '../../assets/images/icons.svg';
import { keyframes } from '@mui/system';
// import { HomeIcon } from '../Icons/CustomIcons';

// Define the keyframes
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`;

const Loader = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				// width: '100vw',
				// height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
				overflow: 'hidden',
			}}
		>
			<Box
				// sx={{
				// 	width: '100px',
				// 	height: '100px',
				// 	animation: `${pulse} 1.5s ease-in-out infinite`,
				// 	display: 'flex',
				// 	justifyContent: 'center',
				// 	alignItems: 'center',
				// }}
			>
				{/* <Logo2 /> */}
			</Box>
		</Box>
	);
};

export default Loader;

// HOUSE LOADER
// import { Box } from '@mui/material';
// import { keyframes } from '@mui/system';
// import HomeIcon from '@mui/icons-material/Home';

// // Define the keyframes for the flowing border
// const flow = keyframes`
//   0% {
//     stroke-dashoffset: 1000;
//   }
//   100% {
//     stroke-dashoffset: 0;
//   }
// `;

// const Loader = () => {
//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'rgba(255, 255, 255, 0.7)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 9999,
//       }}
//     >
//       <Box
//         sx={{
//           position: 'relative',
//           width: '100px',
//           height: '100px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         {/* SVG with animated path */}
//         <svg
//           width="100"
//           height="100"
//           viewBox="0 0 100 100"
//           style={{ position: 'absolute' }}
//         >
//           <path
//             d="M50 20L20 40V80H80V40L50 20Z"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="3"
//             strokeDasharray="1000"
//             strokeDashoffset="1000"
//             style={{
//               animation: `${flow} 2s linear infinite`,
//               color: 'primary.main',
//             }}
//           />
//         </svg>

//         {/* House icon */}
//         <HomeIcon
//           sx={{
//             fontSize: '40px',
//             color: 'primary.main',
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Loader;

// import { Box, Typography } from '@mui/material';
// import { keyframes } from '@mui/system';
// import { useState, useEffect } from 'react';

// const blink = keyframes`
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0; }
// `;

// const messages = [
// 	'klubiq is loading...',
// 	'Preparing your dashboard...',
// 	'Almost there...',
// 	'Just a moment...',
// ];

// const Loader = () => {
// 	const [currentMessage, setCurrentMessage] = useState('');
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const [isDeleting, setIsDeleting] = useState(false);
// 	const [messageIndex, setMessageIndex] = useState(0);

// 	useEffect(() => {
// 		const currentText = messages[messageIndex] || ''; // Add fallback empty string
// 		const speed = isDeleting ? 50 : 150;

// 		if (!isDeleting && currentMessage === currentText) {
// 			setTimeout(() => setIsDeleting(true), 1000);
// 			return;
// 		}

// 		if (isDeleting && currentMessage === '') {
// 			setIsDeleting(false);
// 			setMessageIndex((prev) => (prev + 1) % messages.length);
// 			return;
// 		}

// 		const timer = setTimeout(() => {
// 			if (isDeleting) {
// 				setCurrentMessage(currentText.substring(0, currentIndex - 1));
// 				setCurrentIndex(currentIndex - 1);
// 			} else {
// 				setCurrentMessage(currentText.substring(0, currentIndex + 1));
// 				setCurrentIndex(currentIndex + 1);
// 			}
// 		}, speed);

// 		return () => clearTimeout(timer);
// 	}, [currentMessage, currentIndex, isDeleting, messageIndex]);

// 	return (
// 		<Box
// 			sx={{
// 				position: 'fixed',
// 				top: 0,
// 				left: 0,
// 				right: 0,
// 				bottom: 0,
// 				width: '100vw',
// 				height: '100vh',
// 				backgroundColor: 'rgba(255, 255, 255, 0.7)',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 				zIndex: 9999,
// 			}}
// 		>
// 			<Box sx={{ display: 'flex', alignItems: 'center' }}>
// 				<Typography
// 					variant='h5'
// 					sx={{
// 						color: 'primary.main',
// 						'&::after': {
// 							content: '"|"',
// 							animation: `${blink} 1s step-end infinite`,
// 							marginLeft: '2px',
// 						},
// 					}}
// 				>
// 					{currentMessage}
// 				</Typography>
// 			</Box>
// 		</Box>
// 	);
// };

// export default Loader;
