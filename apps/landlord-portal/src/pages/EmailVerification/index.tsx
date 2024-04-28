import { FC } from "react";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import FeedbackContent from "../../components/FeedbackContent";

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
  const [verifySuccess] = useState(true);
  const [error] = useState(null);

  const renderViewContent = () => {
    if (verifySuccess)
      return (
        <FeedbackContent
          content={
            "Your Email Address has been verified. You can continue using the application."
          }
          onClick={()=>console.log("here")}
          type="success"
        />
      );
    if (error)
      return (
        <FeedbackContent
          content="A verification link has been sent to your email address. Please check your email and click on the link to continue"
          type="error"
          onClick={()=>console.log("here")}

        />
      );
    else return null;
  };
  return (
    <Grid container spacing={1} bgcolor="white">
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            // minHeight: 280,
            px: 8,
            py: 6,
            minWidth: 485,
            maxWidth: 725,
            alignSelf: "center",
            marginTop: "205px",
          }}
        >
          {/* <FeedbackContent
            content="A verification link has been sent to your email address. Please check your email and click on the link to continue"
            type="error"
            onClick={()=>console.log("here")}

          /> */}
          {renderViewContent()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmailVerification;
