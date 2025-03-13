import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function Gallery() {
  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <ImageList variant="masonry" cols={3} gap={12}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ borderRadius: '16px', transition: 'transform 0.3s ease-in-out' }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.description}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://cdn.pixabay.com/photo/2020/03/14/17/05/virus-4931227_640.jpg',
    title: 'Virus Research',
    description: 'Cutting-edge virus research in action.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2013/02/09/04/19/surgery-79584_640.jpg',
    title: 'Surgical Operation',
    description: 'Advanced surgical techniques saving lives.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_640.jpg',
    title: 'Medical Procedures',
    description: 'Doctors performing critical medical procedures.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/07/23/10/44/dentist-2530990_640.jpg',
    title: 'Dental Care',
    description: 'Ensuring bright and healthy smiles.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2013/02/24/01/17/surgery-85574_640.jpg',
    title: 'Emergency Surgery',
    description: 'Life-saving operations under pressure.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/06/28/14/03/dental-2450751_640.jpg',
    title: 'Dental Hygiene',
    description: 'Best practices for oral health.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_640.jpg',
    title: 'Scientific Research',
    description: 'Innovations driven by medical science.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2020/04/19/20/10/test-tube-5065426_640.jpg',
    title: 'Lab Testing',
    description: 'Precision and accuracy in lab diagnostics.'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2018/08/02/07/50/medical-procedures-3579029_640.jpg',
    title: 'Patient Care',
    description: 'Empathy and professionalism in healthcare.'
  }
];
