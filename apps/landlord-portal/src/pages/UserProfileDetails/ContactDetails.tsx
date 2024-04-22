import { Grid, Typography, Button } from "@mui/material";
import ControlledTextField from "../../components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledCheckBox from "../../components/ControlledComponents/ControlledCheckbox";
interface ContactProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ContactDetails: React.FC<ContactProps> = ({setActiveStep}) => {
  const validationSchema = yup.object({
    phoneNumber: yup.string().required("This field is required"),
    companyName: yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    // mailCheck: yup.bool().oneOf([true], "Please Check Box"),
    // mailCheckTwo: yup.bool().oneOf([true], "Please Check Box"),
  });

  type IValuesType = {
    companyName: string;
    phoneNumber: string;
    address: string;
    mailCheck: boolean;
    mailCheckTwo: boolean;
  };

  const onSubmit = async (values: IValuesType) => {
    console.log(values, "hh");
    setActiveStep(1)
  };
  const formik = useFormik({
    initialValues: {
      companyName: "",
      phoneNumber: "",
      address: "",
      mailCheck: false,
      mailCheckTwo: false,
    },
    validationSchema,
    onSubmit,
  });
  return (
    <Grid
      container
      spacing={0.5}
      sx={{
        width: "495px",
        height: "550px",
        margin: "150px 100px 150px 250px",
        alignItems: "center",
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2" color="#002147" mb="0.2rem">
          Company Information{" "}
        </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6" color="#002147" mb="1.5rem">
          Tell us how to reach you!{" "}
        </Typography>
      </Grid> */}
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
          name="phoneNumber"
          label="Phone Number"
          formik={formik}
          type="text"
        />
      </Grid>
      <Grid item sm={12} xs={12} lg={12}>
        <ControlledTextField
          name="address"
          label="Adresss"
          type="text"
          formik={formik}
        />
      </Grid>
      <Grid item sm={12} xs={12} lg={12}>
        <ControlledCheckBox
          name="mailCheck"
          label="Receive email notifications for rent payments"
          type="text"
          formik={formik}
        />
      </Grid>{" "}
      <Grid item sm={12} xs={12} lg={12}>
        <ControlledCheckBox
          name="mailCheckTwo"
          label="Remember this computer"
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
            height:'3.2rem',
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
    </Grid>
  );
};

export default ContactDetails;
