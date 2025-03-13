import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Box,
  Paper,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userAge, setUserAge] = useState('');

  const fetch_user = async () => {
    try {
      const response = await axios.get('http://localhost:8080/userdetails', {
        headers: {
          authorization: localStorage.getItem('jwt'),
        },
      });
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_user();
  }, [isEditing]);

  useEffect(() => {
    setUserName(user?.username);
    setUserEmail(user?.email);
    setUserContact(user?.phone);
    setUserAddress(user?.location);
    setUserGender(user?.gender);
    setUserAge(user?.age);
  }, [user, isEditing]);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8080/updatepatient',
        {
          username: userName,
          email: userEmail,
          password: userPassword,
          phone: userContact,
          location: userAddress,
          age: userAge,
          gender: userGender,
        },
        {
          headers: {
            authorization: localStorage.getItem('jwt'),
          },
        }
      );

      toast.success('Profile Updated Successfully');
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancelClick = () => setIsEditing(false);

  const containerStyle = {
    background: 'linear-gradient(135deg, #2196F3, #21CBF3)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const paperStyle = {
    padding: '40px',
    borderRadius: '20px',
    background: 'white',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '700px',
  };

  const avatarStyle = {
    backgroundColor: '#2196F3',
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
  };

  return (
    <Container style={containerStyle}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper style={paperStyle}>
          <Avatar style={avatarStyle}>{userName?.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#1976D2' }}>
            User Profile
          </Typography>

          <Grid container spacing={3}>
            {[
              { label: 'Name', value: userName, setValue: setUserName },
              { label: 'Email', value: userEmail, setValue: setUserEmail },
              { label: 'New Password', value: userPassword, setValue: setUserPassword, type: 'password' },
              { label: 'Contact', value: userContact, setValue: setUserContact },
              { label: 'Address', value: userAddress, setValue: setUserAddress },
              { label: 'Age', value: userAge, setValue: setUserAge },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {isEditing ? (
                  <TextField
                    label={field.label}
                    fullWidth
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    margin="normal"
                  />
                ) : (
                  <Typography variant="subtitle1">
                    <strong>{field.label}:</strong> {field.value || 'N/A'}
                  </Typography>
                )}
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <Box>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row value={userGender} onChange={(e) => setUserGender(e.target.value)}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </Box>
              ) : (
                <Typography variant="subtitle1">
                  <strong>Gender:</strong> {userGender}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            {isEditing ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="contained" color="primary" onClick={handleSaveClick}>
                    Save
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="contained" color="primary" onClick={handleEditClick}>
                  Edit Profile
                </Button>
              </motion.div>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default UserProfile;
