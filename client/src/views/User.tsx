import React from 'react';
import { Avatar, Divider, Grid, Typography, Rating, Chip, Button } from '@mui/material';
import { UserContext } from '../providers';
import { AssignmentTurnedIn, NoteAdd, ArrowForward, Edit } from '@mui/icons-material';
import theme from '../theme';

const styles = {
  button: {
    borderRadius: '10px',
    height: '43px',
    backgroundColor: '#ffffff',
    color: theme.palette.text.primary,
    border: 'none',
    boxShadow: '0px 3px 8px 0px #00000033',
    '&:hover': {
      backgroundColor: '#fffffff',
      boxShadow: '0px 3px 8px 0px #00000033',
      color: theme.palette.text.primary,
      border: 'none',
    },
  },
  chip: {
    backgroundColor: '#E7E7E7',
    borderRadius: '20px',
    border: 'none',
  },
  editIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

function User() {
  const { button, chip, editIcon } = styles;
  const { user } = React.useContext(UserContext);
  const profileImage = user?.profile_image_url || '/static/images/avatar/1.jpg';

  if (user) {
    const makeChips = () => {
      if (user.interests && user.interests.names) {
        return user.interests.names.map((interest) => {
          return (
            <Chip
              sx={chip}
              key={interest}
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
          <Grid container xs={3.5} sx={{ height: '900px' }}>
            <Grid item container xs={12} justifyContent="center" alignItems="center">
              <Grid item xs={12} />
              <Grid item sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <Avatar src={profileImage} sx={{ width: 250, height: 250 }}></Avatar>
              </Grid>
              <Typography align="center">
                {user.city}, {user.state} {user.zip_code}
              </Typography>
              <Rating name="read-only" value={5} readOnly />
              <Grid item xs={12} sx={{ height: '3rem' }} />
              <Grid item xs={12}>
                <Typography align="center" color={theme.palette.text.secondary}>
                  <AssignmentTurnedIn />
                  identity unverified
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">0 Reviews</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} />
            <Grid item container xs={12} justifyContent="center" alignItems="center">
              <Grid item xs={11}>
                <Typography>Interests</Typography>
                {makeChips()}
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item xs={0.5} />
          <Grid container xs={6.5} sx={{ height: '900px' }}>
            <Grid item xs={12} />
            <Grid item container xs={12}>
              <Grid item xs={8}>
                <Typography variant="h1">
                  {user.firstName} {user.last_name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button>
                  <Edit sx={editIcon} />
                  Edit Profile
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography>{user.bio}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">My Offered Items</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button disableRipple variant="outlined" sx={button}>
                  <NoteAdd />
                  Add your first offer
                </Button>
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ height: '4rem' }} />
            <Grid item xs={12} sx={{ height: '1.5rem' }}>
              <Typography>Accepted Volunteer Jobs</Typography>
            </Grid>
            <Grid item container xs={12} sx={{ height: '1.5rem' }}>
              <Grid item xs={7}>
                <Typography>
                  Search Volunteer Opportunities <ArrowForward />
                </Typography>
              </Grid>
              <Button disableRipple variant="outlined" sx={button}>
                Exchange
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
    };
    return pageContent();
  }
  return <div>My Profile</div>;
}
export default User;
