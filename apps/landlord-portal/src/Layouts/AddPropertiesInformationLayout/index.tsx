import { Button, Stack } from '@mui/material';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPropertiesInformationLayout: FC<{
	children: ReactElement;
	backButtonText?: string;
}> = ({ children, backButtonText = 'Back' }) => {
	const navigate = useNavigate();

	const handleBackArrowClick = () => {
		navigate(-1);
	};
	return (
		<Stack gap={2} direction='column'>
			<Button
					sx={{
						pl: 0,
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						display: 'flex',
						flexDirection: 'row',
					}}
					variant='klubiqTextButton'
					onClick={handleBackArrowClick}
					startIcon={<LeftArrowIcon />}
				>
					{backButtonText}
				</Button>
			<Stack  justifyContent='center' alignItems='center'>
				{children}
			</Stack>
		</Stack>
	);
};

export default AddPropertiesInformationLayout;
