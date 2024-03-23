import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import supabase from "../../supabase";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './FinishSignUp.css'

const paperTheme = createTheme({
  palette: {
    primary: {
      main: "#fff", // Set your primary color for paper-based theme
    },
    secondary: {
      main: "#000", // Set your secondary color for paper-based theme
    },
    success: {
      main: "#4CAF50", // Set Supabase-like green color
    },
    error: {
      main: "#f44336", // Set error color
    },
  },
});

export default function FinishSignUp({ session }) {
  const [formValues, setFormValues] = React.useState({
    businessName: "",
    contactNumber: "",
    address: "",
  });
  const [formError, setFormError] = React.useState(false);
  console.log(session);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (session && session.user) {
      // Check if the user has an existing record in the providers table
      checkExistingRecord(session.user.id);
    }
  }, [session]);

  const checkExistingRecord = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("providers")
        .select("business_name, contact, address")
        .eq("id", userId);

      if (error) {
        throw error;
      }

      console.log(data);

      if (data && data.length > 0) {
        // User has an existing record, redirect to 'delivery-schedule'
        const { business_name, contact, address } = data[0];
        console.log(business_name, contact, address);
        if (business_name && contact && address) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error checking existing record:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formValues.businessName.trim() !== "" &&
      formValues.contactNumber.trim() !== "" &&
      formValues.address.trim() !== ""
    ) {
      try {
        // Insert a new record in the providers table
        await supabase.from("providers").upsert([
          {
            id: session.user.id,
            business_name: formValues.businessName,
            contact: formValues.contactNumber,
            address: formValues.address,
          },
        ]);

        // return <Navigate to="/delivery-schedule" />;
        navigate("/dashboard");
        setFormError(false);
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    } else {
      setFormError(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={paperTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        
          <Box
            className="main-container"
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
                <label>Business Name</label>
                <input
                  autoComplete="organization"
                  name="businessName"
                  required
                  fullWidth
                  id="businessName"
                  placeholder="Enter Business Name"
                  value={formValues.businessName}
                  onChange={handleInputChange}
                  className={
                    formError && formValues.businessName.trim() === ""
                      ? "error"
                      : ""
                  }
                />
                {formError && formValues.businessName.trim() === "" && (
                  <p className="error-message">
                    Please enter the Business Name
                  </p>
                )}
              
                <label>Contact Number</label>
                <input
                  required
                  fullWidth
                  id="contactNumber"
                  name="contactNumber"
                  autoComplete="tel"
                  placeholder="Enter Contact Number"
                  value={formValues.contactNumber}
                  onChange={handleInputChange}
                  className={
                    formError && formValues.contactNumber.trim() === ""
                      ? "error"
                      : ""
                  }
                />
                {formError && formValues.contactNumber.trim() === "" && (
                  <p className="error-message">
                    Please enter the Contact Number
                  </p>
                )}
              
                <label>Address</label>
                <input
                  required
                  fullWidth
                  id="address"
                  name="address"
                  autoComplete="address"
                  placeholder="Enter Address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className={
                    formError && formValues.address.trim() === "" ? "error" : ""
                  }
                />
                {formError && formValues.address.trim() === "" && (
                  <p className="error-message">Please enter the Address</p>
                )}
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="smt"
              color="success" 
              sx={{ mt: 3, mb: 2 }}
            >
              Finish Sign Up
            </Button>
            {formError && (
              <Typography
                variant="body2"
                color="error.main"
                sx={{ textAlign: "center" }}
              >
                Please fill in all required fields.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
