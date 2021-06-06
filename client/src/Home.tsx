import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import type { Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    header: {
        backgroundImage: 'url("https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png")',
        backgroundSize: '100%',
        backgroundPosition: 'center center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


function Home(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <Typography variant="h2" component="h1" color="textPrimary">
                Support local nonprofits through the giving economy.
            </Typography>
        </div>
    );
}

export default Home;
