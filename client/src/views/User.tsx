import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Divider, Grid, Typography, Rating, Chip, Button } from '@mui/material';
import { UserContext } from '../providers';
import { AssignmentTurnedIn, NoteAdd, ArrowForward } from '@mui/icons-material';
import theme from '../theme';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function User() {
  const { id } = useParams<{ id: string }>();
  const { user } = React.useContext(UserContext);

  if (user) {
    // temporarily fill interests with dummy data for styling
    user.interests = user.interests || { names: ['Environment', 'Homelessness', 'Food'] };

    const makeChips = () => {
      if (user.interests) {
        return user.interests.names.map((interest) => {
          return (
            <Chip
              // className={chip}
              label={interest}
              variant="outlined"
              onClick={() => console.log(interest)}
            />
          );
        });
      }
    };

    const pageContent = () => {
      return (
        <Grid container xs={12}>
          <Grid container xs={3} sx={{ height: '700px' }}>
            <Grid item container xs={12} justifyContent="center" alignItems="center">
              <Grid item xs={12} />
              <Grid item>
                <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 250, height: 250 }}></Avatar>
              </Grid>
              <Typography>
                {user.city}, {user.state} {user.zip_code}
              </Typography>
              <Rating name="read-only" value={5} readOnly />
              <Button>Edit Profile</Button>
              <Grid item xs={12} sx={{ height: '3rem' }} />
              <Typography color={theme.palette.text.secondary}>
                <AssignmentTurnedIn />
                identity unverified
              </Typography>
              <Typography color={theme.palette.text.secondary}>0 Reviews</Typography>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <Typography marginLeft={2}>Interests</Typography>
              {makeChips()}
            </Grid>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item xs={0.5} />
          <Grid container xs={7} sx={{ height: '700px' }}>
            <Grid item xs={12} />
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="h1">Hi, I'm {user.firstName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">My Offered Items</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined">
                  <NoteAdd />
                  Add your first offer
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>Accepted Volunteer Jobs</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Search Volunteer Opportunities <ArrowForward />
              </Typography>
              <Button variant="outlined">Exchange</Button>
            </Grid>
          </Grid>
        </Grid>
      );
    };

    if (id) {
      return pageContent();
    } else {
      return <div>My Profile</div>;
    }
  }
}
export default User;
