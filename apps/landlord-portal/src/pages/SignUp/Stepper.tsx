import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
import ContactDetails from "./ContactDetails";
import PropertyInformation from "./PropertyInformation";
// import { Grid, Button, Typography, Paper } from "@mui/material";
import Logo from "../../assets/images/Group 1000002043.png";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { StepLabel } from "@mui/material";

const steps = [
  {
    label: ["Contact Information", <br />, "Tell us how to reach you"],
    Icons: <PersonOutlineOutlinedIcon />,
  },
  {
    label: ["Property Information", <br />, "Add your first property"],
    Icons: <PersonAddAlt1OutlinedIcon />,
  },
];
const StepperComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // const handleStep = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

 

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  
  console.log(activeStep, "active", handleStep);
  return (
    <Box
      sx={{
        // width: "440px",
        // background: "#6699CC",
        // height: "100vh",
        display: "flex",
        // alignItems:"center",
      }}
    >
      <Box
        sx={{
          width: "440px",
          background: "#6699CC",
          height: "100vh",
          // display: "flex",
          // alignItems:"center",
        }}
      >
        <img src={Logo} alt="logo" style={{ width: "159px", height: "32px" }} />

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          non-linear
          sx={{
            width: "350px",
            height: "141.27px",
            marginTop: "380px",
            marginLeft: "46px",
            marginRight: "44px",
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
              //  StepIconComponent={
              //   step.Icons
              // }
                onClick={handleStep(index)}
                icon={step.Icons}
                color="inherit"
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {activeStep === 0 && (
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <ContactDetails />{" "}
        </Box>
      )}
      {activeStep === 1 && (
        <Box
          sx={{
            height: "100vh",
            // marginTop="5vh"
            // width: "75vw",
            // display:"flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <PropertyInformation />
        </Box>
      )}
    </Box>
  );
};

export default StepperComponent;
