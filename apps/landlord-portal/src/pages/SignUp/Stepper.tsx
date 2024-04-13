import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import PropertyDetails from "./PropertyDetails";
import ContactDetails from "./ContactDetails";
import { Grid, Button, Typography, Paper } from "@mui/material";
import Logo from "../../assets/images/Group 1000002043.png";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const steps = [
  {
    label: "Contact Information",
    description: "here",
  },
  {
    label: "Property Information",
    description: "here",
  },
];
const StepperComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
 
  
 
  
  
  // function ColorlibStepIcon(props: StepIconProps) {
  //   const { active, completed, className } = props;
  
  //   const icons: { [index: string]: React.ReactElement } = {
  //     1: <PersonOutlineOutlinedIcon />,
  //     2: <PersonAddAlt1OutlinedIcon />,
  //   };
  
  //   return (
  //     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
  //       {icons[String(props.icon)]}
  //     </ColorlibStepIconRoot>
  //   );
  // }
  

  console.log(activeStep, "active");
  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        sx={{
          height: "100vh",
          background: "#6699CC",
        }}
      >
        <Grid item xs={12} md={12} sm={12} lg={12} mb={"12.5rem"}>
          <img src={Logo} alt="logo" />
        </Grid>

        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>

                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>

      {activeStep === 0 && (
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <PropertyDetails />
        </Grid>
      )}
      {activeStep === 1 && (
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <ContactDetails />{" "}
        </Grid>
      )}
    </Grid>
  );
};

export default StepperComponent;
