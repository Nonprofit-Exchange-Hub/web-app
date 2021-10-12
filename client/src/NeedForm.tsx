import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';

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
        }
    }
}));

function NeedForm() {
    const classes = useStyles();

    return (
        <>
            <Container>
                <Typography variant="h2" component="h2" align="center">What do you need?</Typography>
                <Box className={classes.borderBox}>
                    <Grid container direction="row">
                        <Grid container item sm={6} xs={12} direction="column" alignItems="center">
                            <Link to="/need/goods/" className={classes.linkText}>
                                <button className={classes.squareButton}></button>
                                <Typography variant="body1" component="div" align="center">Goods</Typography>
                            </Link>
                        </Grid>
                        <Grid container item sm={6} xs={12} direction="column" alignItems="center">
                            <Link to="/need/volunteers/" className={classes.linkText}>
                                <button className={classes.squareButton}></button>
                                <Typography variant="body1" component="div" align="center">Volunteers</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default NeedForm;
