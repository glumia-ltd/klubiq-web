import {
	StepLabel,
	Stepper,
	Step,
	styled,
	StepIconProps,
	StepConnector,
	stepConnectorClasses,
} from '@mui/material';
import { HomeIcon } from '../Icons/HomeIcon';
import { FC } from 'react';

const StepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
	backgroundColor: '#fff',
	zIndex: 1,
	width: 56,
	height: 56,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	border: '1px solid #333',
	...(ownerState.active && {
		backgroundColor: '#fff',
		color: '#002147',
		border: '3px solid #002147',
	}),
	...(ownerState.completed && {
		backgroundColor: '#002147',
		color: '#fff',
	}),
}));

const StepIcon = (props: StepIconProps) => {
	const { active, completed, className } = props;

	return (
		<StepIconRoot ownerState={{ completed, active }} className={className}>
			<HomeIcon />
		</StepIconRoot>
	);
};

const LineConnector = styled(StepConnector)(() => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 26,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: '#002147',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: '#002147',
			color: '#fff',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: '#D1D5DB',
		borderRadius: 1,
	},
}));

export const CustomStepper: FC<{ active: number; steps: string[] }> = ({
	active,
	steps,
}) => {
	return (
		<Stepper alternativeLabel activeStep={active} connector={<LineConnector />}>
			{steps.map((label) => {
				return (
					<Step key={label}>
						<StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
					</Step>
				);
			})}
		</Stepper>
	);
};
