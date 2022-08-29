import React from 'react';
import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import theme from '../../theme';
import Example from '../../assets/need-example.png';

export default function NeedCard() {
  return (
    <Card type="need">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between ' }}>
          <Typography gutterBottom>Apparel</Typography>
          <Typography gutterBottom sx={{ fontWeight: 900 }}>
            Long Term
          </Typography>
        </Box>
        <Typography variant="h1">Blazers</Typography>
        <Box sx={{ marginTop: theme.spacing(1) }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon />
            <Typography gutterBottom>Seattle, WA</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon />
            <Typography gutterBottom>Hurricane Relief Effort</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          Lorem ipsum dolor sit amet, mollis consectetur adipiscing elit.
        </Typography>
      </CardContent>
      <CardMedia component="img" image={Example} alt="Need example" />
    </Card>
  );
}
