import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Example from '../../assets/offer-example.png';

export default function OfferCard() {
  return (
    <Card type="donation">
      <CardMedia component="img" image={Example} alt="Need example" />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom>Apparel</Typography>
          <Typography gutterBottom sx={{ fontWeight: 900 }}>
            New
          </Typography>
        </Box>
        <Typography variant="h1">Blazers</Typography>
      </CardContent>
    </Card>
  );
}
