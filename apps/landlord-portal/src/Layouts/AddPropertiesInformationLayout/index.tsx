import { Grid, Typography } from '@mui/material';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddPropertiesInformationLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
	const navigate = useNavigate();

	const handleBackArrowClick = () => {
		navigate(-1);
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
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
					minHeight: '90vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px',
				}}
			>
				{children}
			</Grid>
		</motion.div>
	);
};

export default AddPropertiesInformationLayout;
