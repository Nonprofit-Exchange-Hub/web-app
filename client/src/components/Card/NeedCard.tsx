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
  org?: string;
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
        <Box sx={{ marginTop: theme.spacing(1), padding: '0.5em' }}>
          <Typography variant="h1">{props.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {props.location ? (
              <>
                <LocationOnIcon />
                <Typography sx={{ marginLeft: '0.5em' }} gutterBottom>
                  {props.location}
                </Typography>
              </>
            ) : null}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-0.5em' }}>
            <LocationOnIcon />
            <Typography gutterBottom>Hurricane Relief Effort</Typography>
          </Box>
          <Box sx={{ marginTop: theme.spacing(1) }}>
            <Typography
              variant="body2"
              color={theme.palette.text.secondary}
              style={{ height: '3em', overflow: 'hidden', marginLeft: '0.5em' }}
            >
              {props.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardMedia component="img" image={image} alt="Need example" />
    </Card>
  );
}
