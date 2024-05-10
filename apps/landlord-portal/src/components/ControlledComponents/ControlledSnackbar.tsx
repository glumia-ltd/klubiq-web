import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type Props = {
  message: string;
  autoHideDuration: number;
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "center" | "left" | "right";
  };
};

function ControlledSnackbar({
  message,
  autoHideDuration,
  anchorOrigin,
}: Props): JSX.Element | null {
  const [notiOpen, setNotiOpen] = useState(true);

  if (!message) {
    return null;
  }

  return (
    <Snackbar
      open={notiOpen}
      autoHideDuration={autoHideDuration}
      onClose={() => setNotiOpen(false)}
      message={message}
      anchorOrigin={anchorOrigin}
      action={
        <>
          <Button
            color="secondary"
            size="small"
            onClick={() => setNotiOpen(false)}
          >
            Close
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setNotiOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}
export default ControlledSnackbar;
