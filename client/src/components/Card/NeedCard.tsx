import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import theme from '../../theme';
import Example from '../../assets/need-example.png';
import ProgressBar from './ProgressBar';
import GivingfulG from './../../assets/GivingfulG.svg';

type Props = {
  title: string;
  type: 'need' | 'donation';
  sx?: object;
  datePosted: Date;
  poster: any;
  org: string;
  description: string;
  condition: string;
  location: string;
  imgUrls?: string[];
  children?: ReactNode | ReactNode[];
};
const ellipsesStyle = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
};

export default function NeedCard(props: Props) {
  console.log(props);
  const image = props.imgUrls?.length ? props.imgUrls[0] : Example;
  return (
    <Card
      title={props.title}
      type={props.type}
      datePosted={props.datePosted}
      org={props.org}
      sx={props.sx || {}}
    >
      <CardContent sx={{ margin: '5% 5% 0% 5%' }}>
        <Box sx={{ padding: '0.5em' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '5%' }}>
              <Typography style={{ marginBottom: '.4em' }}> {'{x} of {y} needed'}</Typography>
              <ProgressBar progress={60}></ProgressBar>
            </Box>
            <Typography gutterBottom style={{ fontWeight: 900 }}>
              {'{urgency}'}
            </Typography>
          </Box>
          <Typography gutterBottom>{'{category}'}</Typography>
          <Tooltip title={props.title}>
            <Typography variant="h1" sx={ellipsesStyle}>
              {props.title}
            </Typography>
          </Tooltip>
        </Box>
        <Box sx={{ marginTop: theme.spacing(1) }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-0.5em' }}>
            <LocationOnIcon />
            <Typography gutterBottom>
              {props.location ? props.location : 'Location Not Available'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-0.5em' }}>
            <img src={GivingfulG} alt="My SVG" style={{ width: '27px' }} />
            <Typography gutterBottom>{'{effort}'}</Typography>
          </Box>
          <Box sx={{ marginTop: theme.spacing(1) }}>
            <Typography
              variant="body2"
              color={theme.palette.text.secondary}
              style={{ height: '3em', overflow: 'hidden' }}
            >
              {props.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardMedia component="img" image={image} alt="Need example" sx={{ height: '6em' }} />
    </Card>
  );
}
