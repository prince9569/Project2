import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";

const AppointmentForm = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");

  const [appointmentData, setAppointmentData] = useState({
    doctor: id,
    disease: "",
    date: "",
  });

  const fetchDoctorDetails = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/public/doctor/${id}`, {
        headers: {
          authorization: token,
        },
      });
      setDoctor(data.data);
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to fetch doctor details");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails(id);
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/patient/appointment",
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment");
    }

    setAppointmentData({
      disease: "",
      date: "",
    });
  };

  const handleJoinRoom = () => {
    navigate(`/room/${doctor?.roomid}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!doctor) {
    return (
      <Typography variant="h6" align="center" color="error">
        Doctor details not found.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 4, justifyContent: "center" }}>
        {/* Doctor Details */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom>
            {doctor.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" paragraph>
            {doctor.desc}
          </Typography>
          <Typography variant="body1">Email: {doctor.email}</Typography>
          <Typography variant="body1">Phone: {doctor.contact}</Typography>
          <Typography variant="body1" fontWeight="bold">
            Fee: ₹{doctor.ammount}
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <Typography variant="h6">Expertise:</Typography>
          <List>
            {doctor.expertise.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>

          <Typography variant="h6">Available Dates:</Typography>
          <List>
            {doctor.date?.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Appointment Form */}
      <Grid
        container
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          padding: 3,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" align="center" gutterBottom>
            Book an Appointment
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              name="disease"
              label="Disease"
              value={appointmentData.disease}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            <DatePicker
              className="form-control"
              selected={appointmentData.date}
              onChange={(date) => setAppointmentData({ ...appointmentData, date })}
              placeholderText="Select a date"
              minDate={new Date()}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Confirm Appointment
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AppointmentForm;
