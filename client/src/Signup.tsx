import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Button } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { inherits } from 'util';

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
        textDecoration: 'none'
    },
    formBox: {
        textAlign: 'center',
        width: '100%'
    },
    positionOptions: {
        marginLeft: '20%',
        marginTop: '5rem',
        alignContent: 'center'
    },
    caption: {
        width: '200px'
    }
}));

function Signup() {

    const classes = useStyles()

    return (
        <Container className={classes.formBox}>
            <Typography variant="h2" component="h2">Welcome!</Typography>
            <Typography variant="h2" component="h2">Select your account type.</Typography>
            <Typography variant="body2" component="caption">Already have an account? <Link to="/login">Log In</Link> </Typography>

            <Grid container spacing={8}>
                <Grid item className={classes.positionOptions}>
                    <div className={classes.imageBackground}></div>
                    <Typography className={classes.caption} variant="body2" component="caption">Are you a non-profit organization?</Typography>
                    <Link className={classes.linkText} to="/signup_nonprofit">
                        <Button variant="contained">Create non-profit account</Button>
                    </Link>
                </Grid>
                <Grid item className={classes.positionOptions}>
                    <div className={classes.imageBackground}></div>
                    <Typography className={classes.caption} variant="body2" component="caption">Are you an individual citizen?</Typography>
                    <Link className={classes.linkText} to="/signup_citizen">
                        <Button variant="contained">Create citizen account</Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Signup;
