import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import InfoIcon from '@mui/icons-material/Info';
import RoomOutlined from '@mui/icons-material/RoomOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import type { Theme } from '@mui/material/styles';

import type { Organization } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  orgsHeaderSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  card: {
    marginBottom: '30px',
    '&:not(:last-child)': {
      marginRight: '20px',
    },
    flex: '0 0 30%',
  },
  cardImg: {
    borderRadius: '5px',
    margin: '10%',
    maxWidth: '80%',
  },
  orgsHeader: {
    textAlign: 'left',
    paddingBottom: '20px',
  },
  cardText1: {
    padding: '0 10%',
  },
  cardText2: {
    padding: '0 10% 10%',
  },
}));

type Props = {
  orgs: Organization[];
  headerContentRight?: JSX.Element;
  headerText: string;
};

function OrgsList(props: Props): JSX.Element {
  const classes = useStyles();
  const { orgs, headerContentRight, headerText } = props;
  if (!orgs) return <> </>;

  console.log('orgs', orgs);

  return (
    <>
      <Grid container item justifyContent="space-between">
        <Typography variant="h4" component="h4" className={classes.orgsHeader}>
          {headerText}
        </Typography>
        {headerContentRight ?? null}
      </Grid>
      <div className={classes.orgsHeaderSub}>
        {orgs.map((org) => (
          <NavLink to={`/to={/organizations/${org.id}`} key={org.id} className={classes.card}>
            <Card variant="outlined">
              <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" component="h4" className={classes.cardText1}>
                  {org.name}
                </Typography>
                <div className={classes.cardText2}>
                  <InfoIcon />
                  {org.description}
                </div>
                <div className={classes.cardText2}>
                  <RoomOutlined />
                  {org.address}
                  <br />
                </div>
              </Box>
            </Card>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default OrgsList;
