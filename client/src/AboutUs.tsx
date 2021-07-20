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
    whyImagePlaceholder: {
        width: '474px',
        height: '389px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    biosImagePlaceholder: {
        width: '168px',
        height: '168px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    missionContainer: {
    },
    biosContainer: {
        '& $headerText': {
            marginBottom: '20px',
        },
        '& $titleText': {
        },
    },
    biosImagesContainer: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    biosItem: {
        padding: '15px',
    },
    trustContainer: {
        backgroundColor: '#EBEBEB',
    },
    trustContent: {
        position: 'relative',
        zIndex: 10,
    },
    trustImage: {
        width: '90%',
        maxWidth: '1100px',
        height: '389px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
        margin: '20px 10px 20px 10px',
    },
    buttonRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingTop: '30px',
        paddingBottom: '10px',
        maxWidth: '1200px',
        '& > div': {
            margin: '10px',
        }
    },
    guidelinesBGWrapper: {
        position: 'relative',
        width: '100%',
        height: '0',
        zIndex: 2,
        '& svg': {
            position: 'absolute',
            top: '-300px',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '300px',
            fill: '#F8F8F8',
        },
    },
    orgContainer: {
    },
    titleText: {
        fontSize: '1.3rem',
        marginTop: '6px',
    },
}));

function AboutUs() {
    
    const classes = useStyles();
    const bios = ['Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1'];

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
                    <Box className={classes.whyImagePlaceholder}></Box>
                </Box>
            </Box>
            <Box className={`${classes.missionContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Org mission & values
                </Typography>
                <Typography className={`${classes.headerText}`} variant="body1" component="div">
                    {loremIpsum}
                </Typography>
            </Box>
            <Box className={`${classes.biosContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Who we are (bios)
                </Typography>
                <Typography className={`${classes.headerText}`} variant="body1" component="div">
                    {loremIpsum}
                </Typography>
                <Box className={`${classes.biosImagesContainer}`}>
                    {bios.map((value, index) => {
                        return (
                            <Box className={`${classes.biosItem}`}>
                                <Box className={classes.biosImagePlaceholder}></Box>
                                <Typography className={classes.titleText} variant="body1" component="div">
                                    {value}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            <Box className={`${classes.trustContainer}`}>
                <Box className={`${classes.trustContent} ${classes.mainPageSection}`}>
                    <Typography className={classes.header} variant="h3" component="h3" align="center">
                        Trust, Safety, & Privacy
                    </Typography>
                    <Typography className={`${classes.headerText}`} variant="body1" component="div">
                        {loremIpsum}
                    </Typography>
                    <Box className={`${classes.trustImage}`}></Box>
                    <Box className={`${classes.buttonRow}`}>
                        <SmallDisplayCard
                            headerText="Trust"
                            bodyText={loremIpsum.slice(0,56)}
                        />
                        <SmallDisplayCard
                            headerText="Safety"
                            bodyText={loremIpsum.slice(0,56)}
                        />
                        <SmallDisplayCard
                            headerText="Privacy"
                            bodyText={loremIpsum.slice(0,56)}
                        />
                    </Box>
                </Box>
                <Box className={classes.guidelinesBGWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="0,100 100,0 100,100"/>
                    </svg>
                </Box>
            </Box>
            <Box className={`${classes.orgContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Partnerships w/ organizations
                </Typography>
                <Typography className={`${classes.headerText}`} variant="body1" component="div">
                    {loremIpsum}
                </Typography>
            </Box>
        </>
    );
}

export default AboutUs;
