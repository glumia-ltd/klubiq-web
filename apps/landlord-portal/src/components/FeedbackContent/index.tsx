import { Stack, Typography, useTheme,Button } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
interface FeedbackProps {
  content: string;
  type: "success" | "error";
  // onDismiss: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const FeedbackContent = ({  content, type }: FeedbackProps) => {
  const theme = useTheme();

  return (
    <Stack alignItems={"center"} justifyContent="center" spacing={1}>
      {type === "success" ? (
      <> <CheckCircleOutlineOutlinedIcon sx={{ fontSize: "60px" }} color="success" />
        <Typography variant="h6" align="center">
        { "Email Verified "}
      </Typography>
      <Typography variant="subtitle1"  align="center">
        {content || "Verify Your "}
      </Typography>
      <Button>Sign in</Button></> 
      ) : type === "error" ? (
        <> <MdErrorOutline size={60} color={theme.palette.error.light} />
        <Typography variant="h6" align="center">
        { "Verify Your Email "}
      </Typography>
      <Typography variant="subtitle1"  align="center">
        {content || "Verify Your "}
      </Typography></>
      ) : null}

     
      {/* <Button onClick={onDismiss} variant="contained" color="secondary">
        Okay
      </Button> */}
    </Stack>
  );
};

export default FeedbackContent;
