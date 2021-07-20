import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import SmallDisplayCard from './SmallDisplayCard';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        fontWeight: 'bold',
        marginBottom: 15
    },
    headerText: {
        width: '90%',
        maxWidth: '1100px',
        fontSize: '1.3rem',
    },
    mainPageSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
        paddingBottom: '50px',
        fontSize: '1.4rem',
    },
    titleBox: {
        height: 600,
    },
    whyContainer: {
        backgroundColor: '#EBEBEB',
        // paddingLeft: '10%',
        // paddingRight: '10%',
        '& > *': {
            maxWidth: '1200px',
        },
        '& > $header': {
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'left',
        },
        '& $headerText': {
            paddingRight: '30px',
            flex: '4 4 auto',
            textAlign: 'left',
        },
        // Make this wrap at small screen sizes
        '& $imagePlaceholder': {
            maxWidth: '474px',
            flex: '2 1 auto',
        },
    },
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexWrap: 'wrap',
        paddingTop: '0',
        paddingBottom: '10px',
        maxWidth: '1200px',
    },
    centerHorizontally:  {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '474px',
        height: '389px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
}));

function AboutUs() {
    
    const classes = useStyles();

    return (
        <>
            <Box className={`${classes.titleBox} ${classes.mainPageSection}`}>
            </Box>
            <Box className={`${classes.whyContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Why was NEH created?
                </Typography>
                <Box className={`${classes.row}`}>
                    <Typography className={`${classes.headerText}`}
                        variant="body1" component="div">
                        {loremIpsum}
                        {loremIpsum}
                    </Typography>
                    <Box className={classes.imagePlaceholder}></Box>
                </Box>
            </Box>
        </>
    );
}

export default AboutUs;
