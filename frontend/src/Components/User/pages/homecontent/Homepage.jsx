import React from "react";
import { Avatar, Grid, Typography, useTheme, Box } from "@mui/material";
import Image from 'mui-image';
import Screen from "./Slider";
import Departments from "./Departments";
import Gallery from "./Gallery";
import h1_hero from '../../assets/h1_hero.png';

const Homepage = () => {
  const theme = useTheme();

  const departments = [
    "Anesthesiology And Critical Care",
    "Clinical Biochemistry",
    "Department of Dermatology",
    "Microbiology",
    "Ophthalmology"
  ];

  return (
    <>
      {/* Hero Section */}
      <Grid container spacing={4} sx={{ padding: '50px', background: 'linear-gradient(135deg, #E0EAFC, #CFDEF3)', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
          <Typography variant="h3" sx={{ fontWeight: '700', color: '#333' }}>Welcome to Health Plus</Typography>
          <Typography sx={{ margin: '20px 0', color: '#555', lineHeight: '1.8rem' }}>
            Your trusted partner for accessible and personalized healthcare. Join us on this journey towards a healthier you.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src={h1_hero} alt="Healthcare Illustration" fit="cover" sx={{ borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)' }} />
        </Grid>
      </Grid>

      {/* Departments Section */}
      <Grid container spacing={2} sx={{ marginTop: '60px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ width: '100%', marginBottom: '20px', fontWeight: '600', color: '#444' }}>Our Departments</Typography>
        {departments.map((dept, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)' }}>{dept}</Box>
          </Grid>
        ))}
      </Grid>

      {/* Gallery Section */}
      <Grid container spacing={2} sx={{ marginTop: '60px' }}>
        <Typography variant="h4" sx={{ width: '100%', textAlign: 'center', marginBottom: '20px', fontWeight: '600', color: '#444' }}>Gallery</Typography>
        <Gallery />
      </Grid>
    </>
  );
};

export default Homepage;
