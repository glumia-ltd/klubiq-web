import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ControlledTextField from "../../components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledPasswordField from "../../components/ControlledComponents/ControlledPasswordField";
import StepperComponent from "./Stepper";
// import { useSnackbar } from "notistack";
import ControlledCheckBox from "../../components/ControlledComponents/ControlledCheckbox";

const CreateAccount: React.FC = () => {
  const [page, setPage] = useState("accountcreation");

  const validationSchema = yup.object({
    firstname: yup.string().required("This field is required"),
    companyName: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    password: yup.string().required("Please enter your password"),
    email: yup.string().email().required("Please enter your email"),
    mailCheck: yup.bool().oneOf([true], "Please Check Box"),
  });

  type IValuesType = {
    firstname: string;
    companyName: string;
    lastname: string;
    password: string;
    email: string;
    mailCheck: Boolean;
  };

  const onSubmit = async (values: IValuesType) => {
    console.log(values, "hh");
    setPage("stepper");
  };
  const formik = useFormik({
    initialValues: {
      firstname: "",
      companyName: "",
      lastname: "",
      password: "",
      email: "",
      mailCheck: false,
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      {page === "accountcreation" && (
        <Grid
          container
          spacing={0}
          sx={{
            justifyContent: "center",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            spacing={1}
            sx={{
              alignContent: "center",
            }}
          >
            <Grid
              container
              sx={{
                width: "33rem",
                margin: "2.7rem 11.6rem 0rem 7.5rem",
              }}
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h2" color="#002147" mb="1.5rem">
                  Create a Klubiq account{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h6" color="#002147" mb="1.5rem">
                  Sign Up and get 30 days free trial.{" "}
                </Typography>
              </Grid>
              <Grid container spacing={1}></Grid>
              <Grid item sm={6} xs={12} lg={6}>
                <ControlledTextField
                  name="firstname"
                  label="First Name"
                  type="text"
                  formik={formik}
                />
              </Grid>
              <Grid item sm={6} xs={12} lg={6}>
                <ControlledTextField
                  name="lastname"
                  label="Last Name"
                  formik={formik}
                  type="text"
                />
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <ControlledTextField
                  name="companyName"
                  label="Company Name"
                  type="text"
                  formik={formik}
                />
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <ControlledTextField
                  name="email"
                  label="Email "
                  formik={formik}
                  type="email"
                />
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <ControlledPasswordField
                  name="password"
                  label="Password"
                  type="password"
                  formik={formik}
                />
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <ControlledCheckBox
                  name="mailCheck"
                  label="I agree to the Terms & Conditions"
                  type="text"
                  formik={formik}
                />
              </Grid>

              <Grid
                item
                sm={12}
                xs={12}
                lg={12}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    border: "1px solid #002147",
                    color: "white",
                    background: "#002147",
                    height: "3.1rem",
                    width: "100%",
                    "&:hover": {
                      color: "#002147",
                      background: "#FFFFFF",
                      cursor: "pointer",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid
                item
                sm={12}
                xs={12}
                lg={12}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                // onClick={goBackToLogin}
              >
                <Typography>
                  Already have an account?{" "}
                  <span style={{ color: "#002147", fontWeight: "600" }}>
                    Sign in
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={5}
            sx={{
              background: "#6699CC",
              borderBottomRightRadius: "1.3rem",
              borderBottomLeftRadius: "1.3rem",
              height: "97vh",
              alignSelf: "start",
            }}
          ></Grid>
        </Grid>
      )}
      {page === "stepper" && <StepperComponent />}
    </>
  );
};

export default CreateAccount;
