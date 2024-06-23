import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
import ContactDetails from './ContactDetails';
import PropertyInformation from './PropertyInformation';
import { Grid, Typography, Container } from '@mui/material';
import Logo from '../../assets/images/Group 1000002043.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { StepLabel } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
const steps = [
	{
		label: ['Contact Information', <br />, 'Tell us how to reach you'],
		Icons: <PersonOutlineOutlinedIcon />,
	},
	{
		label: ['Property Information', <br />, 'Add your first property'],
		Icons: <PersonAddAlt1OutlinedIcon />,
	},
];

const StepperComponent: React.FC = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	console.log(activeStep, 'active', handleStep);
	return (
		<Grid container spacing={0}>
			<Grid
				container
				item
				xs={3}
				sm={3}
				md={3}
				lg={3}
				sx={{
					background: '#6699CC',
					backgroundSize: 'cover',
				}}
			>
				<img
					src={Logo}
					alt='logo'
					style={{ width: '159px', height: '32px', margin: '1rem' }}
				/>

				<Stepper
					activeStep={activeStep}
					orientation='vertical'
					non-linear
					sx={{
						width: '350px',
						height: '141.27px',
						margin: '289px 44px 244px 46px',
						cursor: 'pointer',
					}}
				>
					{steps.map((step, index) => (
						<Step key={index}>
							<StepLabel
								StepIconComponent={() => step.Icons}
								onClick={handleStep(index)}
								// icon={step.Icons}
								color='inherit'
							>
								{step.label}
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<Container
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<MailOutlinedIcon sx={{ fontSize: '1rem', marginRight: '7px' }} />

					<Typography variant='h6'>hello@Klubiq.com</Typography>
				</Container>
			</Grid>

			{activeStep === 0 && (
				<Grid
					container
					item
					xs={9}
					sm={9}
					md={9}
					lg={9}
					sx={{
						height: '100vh',
					}}
				>
					<ContactDetails setActiveStep={setActiveStep} />{' '}
				</Grid>
			)}
			{activeStep === 1 && (
				<Grid
					container
					item
					xs={9}
					sm={9}
					md={9}
					lg={9}
					sx={{
						height: '100vh',
					}}
				>
					<PropertyInformation />
				</Grid>
			)}
		</Grid>
	);
};

export default StepperComponent;
