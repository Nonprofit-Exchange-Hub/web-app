import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Divider, Grid, Typography, Rating, Chip, Button } from '@mui/material';
import { UserContext } from '../providers';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function User() {
  const { id } = useParams<{ id: string }>();
  const { user } = React.useContext(UserContext);

  if (user) {
    // temporarily fill interests with dummy data for styling
    user.interests = user.interests || { names: ['Environment', 'Homeless', 'Food'] };

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
          <Grid container xs={3} sx={{ height: '80vh' }}>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 250, height: 250 }}></Avatar>
              <Typography>
                {user.city}, {user.state} {user.zip_code}
              </Typography>
              <Rating name="read-only" value={5} readOnly />
              <Typography>
                <AssignmentTurnedInIcon />
                identity unverified
              </Typography>
            </Grid>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <Typography>Interests</Typography>
              {makeChips()}
            </Grid>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid container xs={8} sx={{ height: '80vh' }}>
            <Grid item xs={12}>
              <Typography>Hi, I'm {user.firstName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>My Offered Items</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined">
                <NoteAddIcon />
                Add your first offer
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>Accepted Volunteer Jobs</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Search Volunteer Opportunities <ArrowForwardIcon />
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
