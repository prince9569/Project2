import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ContactUsPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, message, contact };
    try {
      const response = await axios.post('http://localhost:8080/patient/patientmessage', data);
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <Box py={5} sx={{ backgroundColor: '#f3f4f6' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Get in Touch
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Email sx={{ fontSize: 40, color: '#6C63FF' }} />
              <Typography variant="h6">Email Us</Typography>
              <Typography>contact@healthcare.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Phone sx={{ fontSize: 40, color: '#6C63FF' }} />
              <Typography variant="h6">Call Us</Typography>
              <Typography>+91-9876543210</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <LocationOn sx={{ fontSize: 40, color: '#6C63FF' }} />
              <Typography variant="h6">Our Location</Typography>
              <Typography>IIIT Lucknow, India</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Send Us a Message
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button variant="contained" color="primary" type="submit" size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUsPage;