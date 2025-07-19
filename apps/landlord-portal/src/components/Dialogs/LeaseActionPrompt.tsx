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
import { FC } from 'react';
import { styles } from './style';
import { WarningIcon } from '../Icons/CustomIcons';

type LeaseActionsPromptsType = {
    open: boolean;
    progress?: boolean;
    title: string;
    content?: string;
    rightButtonContent?: string;
    handleDialogButtonAction?: (event: any) => void;
    Icon?: any;
};

 const LeaseActionsPrompts: FC<LeaseActionsPromptsType> = ({
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
                    variant='klubiqOutlinedButton'
                    onClick={handleDialogButtonAction}
                    value={'Cancel'}
                    disabled={progress}
                >
                    Cancel
                </Button>
                <Button
                    variant='klubiqMainButton'
                    onClick={handleDialogButtonAction}
                    autoFocus
                    value={rightButtonContent}
                    disabled={progress}
                >
                    {rightButtonContent}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default LeaseActionsPrompts