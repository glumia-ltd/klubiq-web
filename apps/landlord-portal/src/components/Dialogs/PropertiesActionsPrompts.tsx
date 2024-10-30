import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	LinearProgress,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { styles } from './style';
import { WarningIcon } from '../Icons/CustomIcons';

type PropertiesActionsPromptsType = {
	open: boolean;
	progress?: boolean;
	title: string;
	content: string;
	rightButtonContent: string;
	handleDialogButtonAction: (event: any) => void;
	Icon?: any;
};

export const PropertiesActionsPrompts: FC<PropertiesActionsPromptsType> = ({
	progress,
	open,
	title,
	content,
	rightButtonContent,
	handleDialogButtonAction,
	Icon = WarningIcon,
}) => {
	return (
		<Dialog
			open={open}
			sx={styles.propertiesDialogContainer}
			PaperProps={{
				sx: {
					...styles.propertiesDialogContainer,
				},
			}}
		>
			<Icon sx={{ height: '64px', width: '64px', margin: '15px auto' }} />
			<DialogTitle id='alert-dialog-title' sx={styles.propertiesDialogTitle}>
				{title}
			</DialogTitle>
			{!progress && (
				<DialogContent sx={styles.propertiesDialogContent}>
					<DialogContentText id='alert-dialog-description'>
						{content}
					</DialogContentText>
				</DialogContent>
			)}
			{progress && <LinearProgress sx={styles.linearProgress} />}

			{!progress && <Divider />}
			<DialogActions sx={styles.propertiesDialogActions}>
				<Button
					variant='outlined'
					onClick={handleDialogButtonAction}
					sx={styles.propertiesDialogButtons}
					value={'Cancel'}
				>
					Cancel
				</Button>
				<Button
					variant='contained'
					onClick={handleDialogButtonAction}
					autoFocus
					sx={styles.propertiesDialogButtons}
					value={rightButtonContent}
				>
					{rightButtonContent}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
