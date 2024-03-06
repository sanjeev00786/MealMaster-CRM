import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import supabase from '../../supabase';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const paperTheme = createTheme({
  palette: {
    primary: {
      main: '#fff', // Set your primary color for paper-based theme
    },
    secondary: {
      main: '#000', // Set your secondary color for paper-based theme
    },
    success: {
      main: '#4CAF50', // Set Supabase-like green color
    },
    error: {
      main: '#f44336', // Set error color
    },
  },
});

export default function FinishSignUp({ session }) {
  const [formValues, setFormValues] = React.useState({
    businessName: '',
    contactNumber: '',
    address: '',
  });
  const [formError, setFormError] = React.useState(false);
  console.log(session)
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
        .from('providers')
        .select('business_name, contact, address')
        .eq('id', userId);

      if (error) {
        throw error;
      }

      console.log(data)

      if (data && data.length > 0) {
        // User has an existing record, redirect to 'delivery-schedule'
        const { business_name, contact, address } = data[0];
        console.log(business_name, contact, address)
        if (business_name && contact && address) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error checking existing record:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formValues.businessName.trim() !== '' &&
      formValues.contactNumber.trim() !== '' &&
      formValues.address.trim() !== ''
    ) {
      try {
        // Insert a new record in the providers table
        await supabase.from('providers').upsert([
          {
            id: session.user.id,
            business_name: formValues.businessName,
            contact: formValues.contactNumber,
            address: formValues.address,
          },
        ]);

        // return <Navigate to="/delivery-schedule" />;
        navigate('/dashboard');
        setFormError(false);
      } catch (error) {
        console.error('Error inserting data:', error);
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Finish Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="organization"
                  name="businessName"
                  required
                  fullWidth
                  id="businessName"
                  label="Business Name"
                  value={formValues.businessName}
                  onChange={handleInputChange}
                  variant="filled"
                  error={formError && formValues.businessName.trim() === ''}
                  helperText={
                    formError && formValues.businessName.trim() === '' && 'Please enter the Business Name'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="tel"
                  value={formValues.contactNumber}
                  variant="filled"
                  onChange={handleInputChange}
                  error={formError && formValues.contactNumber.trim() === ''}
                  helperText={
                    formError && formValues.contactNumber.trim() === '' && 'Please enter the Contact Number'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={formValues.address}
                  variant="filled"
                  onChange={handleInputChange}
                  error={formError && formValues.address.trim() === ''}
                  helperText={formError && formValues.address.trim() === '' && 'Please enter the Address'}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success" // Set the button color to Supabase-like green
              sx={{ mt: 3, mb: 2 }}
            >
              Finish Sign Up
            </Button>
            {formError && (
              <Typography variant="body2" color="error.main" sx={{ textAlign: 'center' }}>
                Please fill in all required fields.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

