import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Button } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
// import GroupsIcon from '@mui/icons-material/Groups';
// import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme: Theme) => ({
    imageBackground: {
        width: '200px',
        height: '200px',
        background: '#C4C4C4',
        borderRadius: '130px',
        marginBottom: '1rem',
    },
    linkText: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        '& .MuiTypography-body1': {
            fontSize: '1.6rem',
        }
    },
    formBox: {
        width: '100%',
        padding: '0 2rem 4rem 2rem',
        marginTop: '3rem',
        '& h2': {
            width: '100%',
        },
    },
    centerText: {
        textAlign: 'center'
    },
    positionOptions: {
        marginLeft:'20%',
        marginTop: '5rem'
    }
}));

function Signup() {
    const classes = useStyles()
    return (
        <Container className='formBox'>
            <Typography variant="h2" component="h2">Welcome!</Typography>
            <Typography variant="h2" component="h2">Select your account type.</Typography>            
            <span>Already have an account? <Link to="/login">Log In</Link> </span>         
           
            <Grid container spacing={8}>
                <Grid item className={classes.positionOptions}>
                    <div className={classes.centerText}>
                        <div className={classes.imageBackground}></div>
                        <span>Are you a non-profit</span><br/>
                        <span>organization?</span><br/>
                    <Link className={classes.linkText} to="/signup_nonprofit">
                        <Button variant='contained'>Create non-profit account</Button>
                    </Link>
                    </div>
                </Grid>
                <Grid item className={classes.positionOptions}>
                    <div className={classes.centerText}>
                        <div className={classes.imageBackground}></div>
                        <span>Are you an individual</span><br/>
                        <span>citizen?</span><br/>
                    <Link className={classes.linkText} to="/signup_citizen">
                        <Button variant='contained'>Create citizen account</Button>
                    </Link>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Signup;
