import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import supabase from '../../supabase';
import { useNavigate } from 'react-router-dom';

function FinishSignUp() {
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [emailExists, setEmailExists] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailExists = async () => {
      try {
        const session = supabase.auth.session();
  
        if (session && session.user) {
          const { data } = await supabase
            .from('providers')
            .select('id')
            .eq('email_id', session.user.email);
  
          setEmailExists(data.length > 0);
        }
      } catch (error) {
        console.error('Error checking email existence:', error.message);
      }
    };
  
    checkEmailExists();
  }, []);
  
  const handleBusinessNameChange = (event) => {
    setBusinessName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFinishSignUp = async () => {
    try {
      // Get the user information
      const { data: { user } } = await supabase.auth.getUser();

      // Insert data into the 'providers' table
      const { data, error } = await supabase
        .from('providers')
        .upsert([
          {
            id: user.id,
            business_name: businessName,
            contact: contactNumber,
            email_id: user.email,
            address: address,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Provider data inserted:', data);
    } catch (error) {
      console.error('Error finishing sign up:', error);
    }

    navigate(emailExists ? '/delivery-schedule' : '/finish-sign-up');
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, margin: 'auto' }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Finish Sign Up
      </Typography>
      <TextField
        label="Business Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={businessName}
        onChange={handleBusinessNameChange}
      />
      <TextField
        label="Contact Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contactNumber}
        onChange={handleContactNumberChange}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        rows={4}
        margin="normal"
        value={address}
        onChange={handleAddressChange}
      />
      <Button variant="contained" color="primary" onClick={handleFinishSignUp}>
        Finish Sign Up
      </Button>
    </Paper>
  );
}

function SignUpWrapper() {
    return (
      <Container component="main" maxWidth="xs">
        <FinishSignUp />
      </Container>
    );
  }

export default SignUpWrapper;