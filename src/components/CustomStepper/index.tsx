import {
	StepLabel,
	Stepper,
	Step,
	styled,
	StepIconProps,
	StepConnector,
	stepConnectorClasses,
} from '@mui/material';
import { FC } from 'react';
import { styles } from './styles';
import { RouteObjectType } from '../../shared/type';

const StepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor: '#ffffff',
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

	[theme.breakpoints.down('sm')]: {
		width: 46,
		height: 46,
	},
	[theme.breakpoints.down('xs')]: {
		width: 36,
		height: 36,
	},
}));

const ModifiedStepIcon =
	(DynamicIcon: React.ReactNode) => (props: StepIconProps) => {
		const { active, completed, className } = props;

		return (
			<StepIconRoot ownerState={{ completed, active }} className={className}>
				{DynamicIcon}
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

export const CustomStepper: FC<{
	active: number;
	routes: RouteObjectType;
}> = ({ active, routes }) => {
	return (
		<Stepper
			alternativeLabel
			activeStep={active}
			connector={<LineConnector />}
			sx={styles.stepper}
		>
			{Object.keys(routes).map((label) => {
				const icon = routes[label] && routes[label]?.icon;

				return (
					<Step key={label}>
						<StepLabel
							StepIconComponent={ModifiedStepIcon(icon)}
							sx={{
								'& .MuiStepLabel-label': {
									fontWeight: 'normal',
									color: 'primary.main',
								},
								'& .Mui-completed ': {
									fontWeight: 'bold',
									color: 'primary.main',
								},
								'& .Mui-active ': {
									fontWeight: 'bold',
									color: 'primary.main',
								},
							}}
						>
							{label}
						</StepLabel>
					</Step>
				);
			})}
		</Stepper>
	);
};
