import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Example from '../../assets/offer-example.png';

type Props = {
  title: string;
  type: 'need' | 'donation';
  datePosted: Date;
  org: string;
  children?: ReactNode | ReactNode[];
};

export default function OfferCard(props: Props) {
  return (
    <Card title={props.title} type={props.type} date={props.datePosted} org={props.org}>
      <CardMedia component="img" image={Example} alt="Need example" />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography gutterBottom>Apparel</Typography>
          <Typography gutterBottom sx={{ fontWeight: 900 }}>
            New
          </Typography>
        </Box>
        <Typography variant="h1">{props.title}</Typography>
      </CardContent>
    </Card>
  );
}
