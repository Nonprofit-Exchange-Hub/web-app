import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import theme from '../../theme';
import Example from '../../assets/need-example.png';

type Props = {
  title: string;
  type: 'need' | 'donation';
  sx?: object;
  datePosted: Date;
  poster: any;
  description: string;
  condition: string;
  location: string;
  imgUrls?: string[];
  children?: ReactNode | ReactNode[];
};

export default function NeedCard(props: Props) {
  const image = props.imgUrls?.length ? props.imgUrls[0] : Example;
  return (
    <Card
      title={props.title}
      type={props.type}
      date={props.datePosted}
      sx={props.sx || {}}
      org={props.poster.firstName}
    >
      <CardContent>
        <Typography variant="h1">{props.title}</Typography>
        <Box sx={{ marginTop: theme.spacing(1) }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {props.location ? (
              <>
                <LocationOnIcon />
                <Typography gutterBottom>{props.location}</Typography>
              </>
            ) : null}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon />
            <Typography gutterBottom>Hurricane Relief Effort</Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          style={{ height: '3em', overflow: 'hidden' }}
        >
          {props.description}
        </Typography>
      </CardContent>
      <CardMedia component="img" image={image} alt="Need example" />
    </Card>
  );
}
