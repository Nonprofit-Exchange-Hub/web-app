import React from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import theme from '../../theme';

export default function Card(props: any) {
  return (
    <MuiCard>
      <CardActionArea>
        {props.children}
        <Box
          sx={{
            padding: '0.5rem',
            background:
              props.type === 'need'
                ? `${theme.palette.primary.gradient}`
                : `${theme.palette.secondary.gradient}`,
          }}
        >
          <Typography variant="body2" color={theme.palette.primary.contrastText}>
            Posted on 09/01/2022
          </Typography>
          <Typography variant="body2" color={theme.palette.primary.contrastText}>
            By Dress for Success
          </Typography>
        </Box>
      </CardActionArea>
    </MuiCard>
  );
}
