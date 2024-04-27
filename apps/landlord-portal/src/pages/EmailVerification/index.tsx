import { FC } from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Container,Typography, Paper } from "@mui/material";
import Logo from "../../assets/images/Group 1000002043.png";
import FeedbackContent from "../../components/FeedbackContent";
import { useNavigate } from "react-router-dom";

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = ({}) => {
  const [verifySuccess, setVerifySuccess] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backToHome = () => navigate("/", { replace: true });

  const renderViewContent = () => {
    if (verifySuccess)
      return (
        <FeedbackContent
          content={"Your Email Address has been verified,You can continue using the application."}
          // onDismiss={backToHome}
          type="success"
        />
      );
    if (error) return <FeedbackContent content={error} type="error" />;
    else return <><Typography variant="h4" >Invalid Link Or Page is broken</Typography></>;
  };
  return (
    <Grid container spacing={1} bgcolor="white">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <img
          src={Logo}
          alt="companylogo"
          style={{ width: "159px", height: "32px", margin: "1rem" }}
          onClick={backToHome}
        />
      </Grid>
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
          marginTop: "15rem",
        }}
      >
        <Paper
        elevation={2}
        square
        sx={{
          minHeight: 280,
          px: 8,
          py: 6,
          minWidth: 485,
          maxWidth: 725,
          alignSelf: "center",
          position: "relative",
        }}>
        {renderViewContent()}
        </Paper>
       

      </Grid>
    </Grid>
  );
};

export default EmailVerification;
