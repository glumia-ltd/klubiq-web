
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  message: string;
  isOpen: boolean;
};

function ControlledSnackbar({ message, isOpen }: Props): JSX.Element | null {
  // const [notiOpen, setNotiOpen] = useState(true);

  if (!message) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isOpen}
      autoHideDuration={10000}
      onClose={() => isOpen}
      message={message}
      action={
        <>
          <Button color="secondary" size="small" onClick={() => isOpen}>
            Close
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => isOpen}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}
export default ControlledSnackbar;
