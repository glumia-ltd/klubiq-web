import { Button, Stack } from '@mui/material';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPropertiesInformationLayout: FC<{ children: ReactElement, backButtonText?: string }> = ({
	children,
	backButtonText = 'Back',
}) => {
	const navigate = useNavigate();

	const handleBackArrowClick = () => {
		navigate(-1);
	};
	return (
		<Stack gap={1} direction='column' sx={{ height: '100vh'}}>
			<Stack sx={{pl: 8}} justifyContent='flex-start' alignItems='flex-start'>
			<Button variant='klubiqTextButton' onClick={handleBackArrowClick} startIcon={<LeftArrowIcon />}>
					{backButtonText}
				</Button>
			</Stack>
			<Stack sx={{p: 1}} justifyContent='center' alignItems='center'>
				{children}
			</Stack>
		</Stack>
	);
};

export default AddPropertiesInformationLayout;
