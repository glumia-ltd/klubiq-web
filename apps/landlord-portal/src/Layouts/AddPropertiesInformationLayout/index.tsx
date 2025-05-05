import { Grid, Typography } from '@mui/material';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPropertiesInformationLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
	const navigate = useNavigate();

	const handleBackArrowClick = () => {
		navigate(-1);
	};
	return (
		<>
			<Grid
				sx={{
					cursor: 'pointer',
					display: 'flex',
					gap: '16px',
					alignItems: 'center',
					margin: '26px',
					color: 'primary.main',
				}}
				onClick={handleBackArrowClick}
			>
				<LeftArrowIcon />
				<Typography fontWeight={500} fontSize={18}>
					Back
				</Typography>
			</Grid>
			<Grid
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px',
				}}
			>
				{children}
			</Grid>
		</>
	);
};

export default AddPropertiesInformationLayout;
