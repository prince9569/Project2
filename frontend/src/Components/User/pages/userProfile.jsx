import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
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
      await axios.put(
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

  const paperStyle = {
    padding: '40px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '50px auto',
  };

  const avatarStyle = {
    backgroundColor: '#007BFF',
    width: '100px',
    height: '100px',
    fontSize: '40px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: '30px',
  };

  const fieldStyle = {
    marginBottom: '20px',
  };

  return (
    <Container>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper style={paperStyle}>
          <Avatar style={avatarStyle}>{userName?.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h4" style={headingStyle}>
            User Profile
          </Typography>

          <Grid container spacing={4}>
            {[
              { label: 'Name', value: userName, setValue: setUserName },
              { label: 'Email', value: userEmail, setValue: setUserEmail },
              { label: 'New Password', value: userPassword, setValue: setUserPassword, type: 'password' },
              { label: 'Contact', value: userContact, setValue: setUserContact },
              { label: 'Address', value: userAddress, setValue: setUserAddress },
              { label: 'Age', value: userAge, setValue: setUserAge },
              { label: 'Gender', value: userGender, setValue: setUserGender },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {isEditing ? (
                  <TextField
                    label={field.label}
                    fullWidth
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    style={fieldStyle}
                  />
                ) : (
                  <Typography variant="subtitle1">
                    <strong>{field.label}:</strong> {field.value || 'N/A'}
                  </Typography>
                )}
              </Grid>
            ))}
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
