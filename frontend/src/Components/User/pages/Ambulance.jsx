import React, { useState } from 'react';
import { Typography, Container, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const AmbulanceBooking = () => {

    const navigate = useNavigate();
    const [bookingInfo, setBookingInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        emergencyType: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingInfo({ ...bookingInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(bookingInfo);
        try {
            const response = await axios.post('http://localhost:8080/patient/ambulance', bookingInfo);
            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    🚑 Book an Ambulance 🚑
                </Typography>
            </motion.div>
            <Box p={3} sx={{ backgroundColor: '#f4f6f8', borderRadius: 4, boxShadow: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {['name', 'phoneNumber', 'address', 'city', 'state', 'zip'].map((field) => (
                            <Grid item xs={12} key={field}>
                                <TextField
                                    fullWidth
                                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                    variant="outlined"
                                    name={field}
                                    value={bookingInfo[field]}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="emergencyType">Emergency Type</InputLabel>
                                <Select
                                    label="Emergency Type"
                                    name="emergencyType"
                                    value={bookingInfo.emergencyType}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="">Select an emergency type</MenuItem>
                                    <MenuItem value="Accident">Accident</MenuItem>
                                    <MenuItem value="Medical Emergency">Medical Emergency</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    🚨 Book Ambulance 🚨
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default AmbulanceBooking;