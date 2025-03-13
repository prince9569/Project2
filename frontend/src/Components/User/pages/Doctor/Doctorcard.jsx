import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DoctorCard({ item }) {
  const { expertise, name, image, _id } = item;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card
        sx={{
          maxWidth: 300,
          borderRadius: '20px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: '0.3s ease-in-out',
        }}
      >
        <CardMedia
          sx={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
          height="200"
          image={image}
          title={name}
          component='img'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {expertise}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Highly experienced in their field, providing top-notch medical care.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/form/${_id}`}
            sx={{ borderRadius: '12px', textTransform: 'none' }}
          >
            Book Appointment
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
