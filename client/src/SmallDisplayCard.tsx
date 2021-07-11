import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box } from '@material-ui/core';

import type { Theme } from '@material-ui/core/styles';

const circleSize = 76;
const width = 325;
const height = 133;

const useStyles = makeStyles((theme: Theme) => ({
    smallDisplayCard: {
        // Should probably move the sizing out of the component, maybe pass it in
        maxWidth: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#767676',
        color: '#FFFFFF',
    },
    content: {
        height: '100%',
        paddingLeft: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: '28px',
        textAlign: 'left',
    },
    cardBody: {
        fontSize: '15px',
        textAlign: 'left',
    },
    circleWrapper: {
        width: '1px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
    },
    circle: {
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        left: `-${circleSize/2}px`,
        position: 'relative',
    },
}));

function SmallDisplayCard() {
    const classes = useStyles();

    return (
        <Card className={classes.smallDisplayCard}>
            <Box className={classes.circleWrapper}>
                <Box className={classes.circle}></Box>
            </Box>
            <Box className={classes.content}>
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
