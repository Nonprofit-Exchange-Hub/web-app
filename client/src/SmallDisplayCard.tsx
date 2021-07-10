import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box } from '@material-ui/core';

import type { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    smallDisplayCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '325px',
        height: '133px',
        backgroundColor: '#767676',
        color: '#FFFFFF',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: '28px',
        textAlign: 'left',
    },
    cardBody: {
        fontSize: '17px',
        textAlign: 'left',
    },
    padding: {
        paddingLeft: '70px',
    },
}));

function SmallDisplayCard() {
    const classes = useStyles();

    return (
        <Card className={classes.smallDisplayCard}>
            <Box className={classes.padding}>
                <Typography className={classes.cardTitle} variant="body1" component="div">
                    Card
                </Typography>
                <Typography className={classes.cardBody} variant="body1" component="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
            </Box>
        </Card>
    );
}

export default SmallDisplayCard;
