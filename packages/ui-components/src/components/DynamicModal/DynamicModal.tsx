import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  DialogTitle,
  Box,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  buttons?: ModalButton[];
  backdropClose?: boolean;
}

interface ModalButton {
  label: string;
  onClick: () => void;
  buttonProps?: React.ComponentProps<typeof Button>;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
}

export const DynamicModal: React.FC<DynamicModalProps> = ({
  open,
  onClose,
  children,
  title,
  buttons,
  backdropClose = true,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <Dialog
      open={isOpen}
      onClose={backdropClose ? handleClose : undefined}
      aria-labelledby="dynamic-modal-title"
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 2, position: "relative" },
      }}
    >
      <DialogTitle
        id="dynamic-modal-title"
        sx={{ p: 0, minHeight: 40, position: "relative" }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {title && (
          <Box sx={{ textAlign: "center", mt: 3, mb: 1 }}>{title}</Box>
        )}
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", pt: title ? 0 : 4 }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Stack direction="row" spacing={2}> 
          {buttons?.map((button, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              onClick={button.onClick}
              {...button.buttonProps}
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};