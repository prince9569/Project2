import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import axios from "axios";

import DoctorCard from "./Doctorcard";
import Loading from "../../Loading";
import { getdoctor } from "../../slices/getDoctor";

const Doctor = () => {
  const dispatch = useDispatch();
  const { doctor, isLoading, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getdoctor());
  }, [dispatch]); // Added dispatch to dependency array

  return (
    <>
      <Loading isloading={isLoading} />

      {/* Error Handling */}
      {error && (
        <Typography color="error" variant="h6" textAlign="center">
          Failed to load doctors. Please try again later.
        </Typography>
      )}

      <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
        <Grid item xs={12} sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "40px",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            OUR DOCTORS
          </Typography>
        </Grid>

        {/* Doctors Grid */}
        {doctor?.doctors?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ padding: "10px" }}>
            <DoctorCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Doctor;
