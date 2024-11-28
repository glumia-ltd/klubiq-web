import React, { useState, useRef } from 'react';
import { Popper, Grow, Paper, ClickAwayListener } from '@mui/material';

interface Props {
	children: React.ReactNode;
	anchorEl: HTMLElement | null;
	open: boolean;
	onClose: () => void;
	role?: string | undefined;
	placement?:
		| 'bottom-start'
		| 'bottom-end'
		| 'top-start'
		| 'top-end'
		| 'bottom'
		| 'top'
		| 'left'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right-end'
		| 'right';
}
const CustomPopper: React.FC<Props> = ({
	children,
	anchorEl,
	open,
	onClose,
	placement = 'bottom-start',
	role = undefined,
}) => {
	return (
		<Popper
			open={open}
			anchorEl={anchorEl}
			role={role}
			transition
			placement={placement}
			disablePortal
			sx={{ minWidth: '160px', zIndex: 10 }}
		>
			{({ TransitionProps }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin:
							placement === 'bottom-start' ? 'left top' : 'left bottom',
					}}
				>
					<Paper>
						<ClickAwayListener onClickAway={onClose}>
							<div>{children}</div>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	);
};
export default CustomPopper;
