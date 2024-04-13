import ControlledTextField from "../../components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import CountryList from "../../helpers/countryList.json";
import StateList from "../../helpers/stateList.json";
import { Grid, Typography, Button } from "@mui/material";

import ControlledSelect from "../../components/ControlledComponents/ControlledSelect";
const ContactDetails: React.FC = () => {
  const validationSchema = yup.object({
    propertyName: yup.string().required("This field is required"),
    propertyType: yup.string().required("This field is required"),
    zip: yup.string().required("This field is required"),
    street: yup.string().required("Please enter your password"),
    state: yup.string().required("This field is required"),
    country: yup.string().required("This field is required"),
    city: yup.string().required("This field is required"),
  });

  type IValuesType = {
    propertyName: string;
    propertyType: string;
    zip: string;
    street: string;
    country: string;
    state: string;
    city: string;
  };

  const onSubmit = async (values: IValuesType) => {
    console.log(values, "hh");
  };
  const formik = useFormik({
    initialValues: {
      propertyName: "",
      propertyType: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      street: "",
    },
    validationSchema,
    onSubmit,
  });

  const states = StateList.map((item) => ({
    value: item.name,
    label: item.name,
  }));
  const country = CountryList.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  return (
    <Grid
      container
      spacing={1}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        alignItems: "center",
        justifyContent:"flex-end",
        width:"600px"
      }}
    > 
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2" color="#002147" mb="0.2rem">
          Property Information{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6" color="#002147" mb="1.5rem">
          Tell us about your property.{" "}
        </Typography>
      </Grid>
      <Grid item sm={12} xs={12} lg={12}>
        <ControlledTextField
          name="propertyName"
          label="Property Name"
          type="text"
          formik={formik}
        />
      </Grid>
      <Grid item sm={12} xs={12} lg={12}>
        <ControlledTextField
          name="propertyType"
          label="Property Type"
          formik={formik}
          type="text"
        />
      </Grid>
      <Grid item sm={6} xs={12} lg={6}>
        <ControlledSelect
          name="country"
          label="Country"
          type="text"
          formik={formik}
          options={country}
        />
      </Grid>
      <Grid item sm={6} xs={12} lg={6}>
        <ControlledSelect
          name="state"
          label="State"
          type="text"
          formik={formik}
          options={states}
        />
      </Grid>
      <Grid item sm={6} xs={12} lg={6}>
        <ControlledTextField
          name="city"
          label="City"
          type="text"
          formik={formik}
        />
      </Grid>
      <Grid item sm={6} xs={12} lg={6}>
        <ControlledTextField
          name="street"
          label="Street"
          type="text"
          formik={formik}
        />
      </Grid>

      <Grid item sm={6} xs={12} lg={6}>
        <ControlledTextField
          name="zip"
          label="Zip Code"
          formik={formik}
          type="email"
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
          marginTop: ".5rem",
        }}
      >
        <Button
          type="submit"
          sx={{
            border: "1px solid #002147",
            color: "white",
            background: "#002147",
            width: "100%",
            borderRadius: "0.6rem",
            padding: "0.5rem",
            "&:hover": {
              color: "#002147",
              background: "#FFFFFF",
              cursor: "pointer",
            },
          }}
        >
          Save & Continue
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
          marginTop: "1rem",
          cursor: "pointer",
        }}
        // onClick={goBackToLogin}
      >
        <Typography>
          Already have an account?{" "}
          <span style={{ color: "#002147", fontWeight: "600" }}>Sign in</span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactDetails;
