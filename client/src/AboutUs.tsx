import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import SmallDisplayCard from './SmallDisplayCard';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";



const useStyles = makeStyles((theme: Theme) => ({
    // universal styles
    header: {
        fontWeight: 'bold',
        marginBottom: 15
    },
    headerText: {
        width: '100%',
        maxWidth: '1100px',
        fontSize: '1.3rem',
        textAlign: 'left',
    },
    mainPageSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
        paddingBottom: '50px',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontSize: '1.4rem',
    },
    // page specific styles
    titleBox: {
        height: 600,
    },
    whyContainer: {
        backgroundColor: '#EBEBEB',
        '& > *': {
            maxWidth: '1200px',
        },
        '& > $header': {
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'left',
        },
        '& $headerText': {
            textAlign: 'left',
            width: '100%',
        },
        '& $imagePlaceholder': {
            width: '100%',
        },
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
        width: '100%',
        maxWidth: '474px',
        height: '300px',
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
    missionContent: {
        // display: 'grid',
        // gridTemplateColumns: 'repeat(7, 132px)',
        // gridTemplateRows: 'auto',
        // columnGap: '20px',
        // rowGap: '20px',
        margin: '20px 0 10px 0',
        maxWidth: '1200px',
    },
    missionGridImage: {
        // width: '100%',
        height: '109px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
        margin: '8px',
    },
    missionText: {
        // gridColumn: '5 / span 3',
        textAlign: 'left',
        fontSize: '1.4rem',
    },
    // missionText1: {
    //     gridRow: '1 / span 1',
    // },
    // missionText2: {
    //     gridRow: '2 / span 1',
    // },
    // missionText3: {
    //     gridRow: '3 / span 1',
    // },
    missionTitle: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
    },
    // // smaller than lg
    // '@media screen and (max-width: 1100px)': {
    //     missionContent: {
    //         gridTemplateColumns: 'repeat(6, 1fr)',
    //     },
    //     missionText: {
    //         gridColumn: '4 / span 3',
    //     },
    // },
    // // smaller than md
    // '@media screen and (max-width: 820px)': {
    //     missionContent: {
    //         gridTemplateColumns: 'repeat(4, 1fr)',
    //     },
    //     missionText: {
    //         gridColumn: '1 / span 4',
    //     },
    //     missionText1: {
    //         gridRow: 'auto / span 1',
    //     },
    //     missionText2: {
    //         gridRow: 'auto / span 1',
    //     },
    //     missionText3: {
    //         gridRow: 'auto / span 1',
    //     },
    // },
    // // smaller than sm
    // '@media screen and (max-width: 520px)': {
    //     missionContent: {
    //         gridTemplateColumns: 'repeat(3, 1fr)',
    //     },
    //     missionText: {
    //         gridColumn: '1 / span 3',
    //     },
    // },
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
        margin: '40px 0 20px 0',
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
    orgContent: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '20px',
    },
    orgImage: {
        width: '60px',
        height: '60px',
        border: '1px solid black',
        backgroundColor: '#000000',
        borderRadius: '50%',
        margin: '30px 80px 30px 80px',
    },
    titleText: {
        fontSize: '1.3rem',
        marginTop: '6px',
    },
}));

function AboutUs() {
    
    const classes = useStyles();
    const bios = ['Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1', 'Team1'];
    const orgs = ['Google', 'Facebook', 'Chrome', 'Org', 'Org', 'Org', 'Org', 'Org', 'Org', 'Org'];
    const smallImgs = ['sm', 'sm', 'sm', 'sm', 'lg', 'sm', 'sm', 'sm', 'sm', 'sm'];

    return (
        <>
            <Box className={`${classes.titleBox} ${classes.mainPageSection}`}>
            </Box>
            <Box className={`${classes.whyContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Why was NEH created?
                </Typography>
                <Grid container spacing={5} alignItems='center'>
                    <Grid item xs={12} sm={6} md={8}>
                        <Typography className={`${classes.headerText}`}
                            variant="body1" component="div">
                            {loremIpsum}
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item xs sm>
                        <Box className={classes.whyImagePlaceholder}></Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className={`${classes.missionContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Org mission & values
                </Typography>
                <Typography className={`${classes.headerText}`} variant="body1" component="div">
                    {loremIpsum}
                </Typography>
                <Grid container spacing={5} className={`${classes.missionContent}`}>
                    <Grid item xs={12} sm={6} md={8}>
                        <Grid container direction="row" spacing={2}>
                            {/* <Grid item xs={9} className={`${classes.missionWideImage}`}></Grid> */}
                            {smallImgs.map((value, index) => {
                                if (value == 'sm')
                                    return <Grid xs={6} sm={4} md={3}><Box className={`${classes.missionGridImage}`}></Box></Grid>
                                else
                                    return <Grid xs={12} sm={8} md={9}><Box className={`${classes.missionGridImage}`}></Box></Grid>
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs sm md>
                        <Grid container spacing={3} direction="column">
                            <Grid item className={classes.missionText}>
                                <Typography className={`${classes.missionTitle}`} variant="body1" component="div">Mission Statement</Typography>
                                {loremIpsum.slice(0,97)}
                            </Grid>
                            <Grid item className={classes.missionText}>
                                <Typography className={`${classes.missionTitle}`} variant="body1" component="div">Vision Statement</Typography>
                                {loremIpsum.slice(0,97)}
                            </Grid>
                            <Grid item className={classes.missionText}>
                                <Typography className={`${classes.missionTitle}`} variant="body1" component="div">Values</Typography>
                                {loremIpsum.slice(0,97)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
                <Box className={`${classes.orgContent}`}>
                    {orgs.map((value, index) => {
                        return (
                            <Box className={classes.orgImage}></Box>
                        )
                    })}
                    
                </Box>
            </Box>
        </>
    );
}

export default AboutUs;
