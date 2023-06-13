import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Container } from '@mui/material';

import type { Theme } from '@mui/material/styles';

import { TextLink } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  borderBox: {
    width: '100%',
    maxWidth: '800px',
    border: '1px solid #C4C4C4',
    padding: '4rem',
    marginTop: '3rem',
  },
  squareButton: {
    width: '245px',
    height: '245px',
    background: '#FFFFFF',
    border: '1px solid #000000',
    borderRadius: '10px',
    marginBottom: '1rem',
  },
  linkText: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '& .MuiTypography-body1': {
      fontSize: '1.6rem',
    },
  },
}));

type FormProps = {
  title: string;
  links: TextLink[];
};

function LinkPage(props: React.PropsWithChildren<FormProps>) {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Typography variant="h2" component="h2" align="center">
          {props.title}
        </Typography>
        <Box className={classes.borderBox}>
          <Grid container direction="row">
            {props.links.map((link, index) => {
              return (
                <Grid
                  key={link.url}
                  container
                  item
                  sm={6}
                  xs={12}
                  direction="column"
                  alignItems="center"
                >
                  <Link to={link.url} className={classes.linkText}>
                    <button className={classes.squareButton}></button>
                    <Typography variant="body1" component="div" align="center">
                      {link.text}
                    </Typography>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default LinkPage;
