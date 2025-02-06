import { Box } from '@mui/material';
import Logo2 from '../../assets/images/icons.svg';
import { keyframes } from '@mui/system';

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
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
			}}
		>
			<Box
				sx={{
					width: '100px',
					height: '100px',
					animation: `${pulse} 1.5s ease-in-out infinite`,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img src={Logo2} alt='klubiq' style={{ width: '50%', height: '50%' }} />
			</Box>
		</Box>
	);
};

export default Loader;
