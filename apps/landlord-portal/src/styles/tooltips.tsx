import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const NavToolTips = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
	  backgroundColor: theme.palette.secondary.light,
	  maxWidth: 220,
	  fontSize: theme.typography.pxToRem(12),
	  padding: '10px',
	},
  }));
