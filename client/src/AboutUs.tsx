import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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
        width: '90%',
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
        // TODO: Make this wrap at small screen sizes
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
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    '@media screen and (max-width: 800px)': {
        whyContainer: {
            '& $imagePlaceholder': {
            },
        },
        row: {
            flexDirection: 'column-reverse',
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
    missionContent: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 132px)',
        gridTemplateRows: 'auto',
        columnGap: '20px',
        rowGap: '20px',
        margin: '30px 0 10px 0',
        maxWidth: '1200px',
    },
    missionSmallImage: {
        width: '100%',
        height: '109px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    missionWideImage: {
        gridColumn: '1 / span 3',
        gridRow: '2 / span 1',
        width: '100%',
        height: '109px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    missionText: {
        gridColumn: '5 / span 3',
        textAlign: 'left',
        fontSize: '1.4rem',
    },
    missionText1: {
        gridRow: '1 / span 1',
    },
    missionText2: {
        gridRow: '2 / span 1',
    },
    missionText3: {
        gridRow: '3 / span 1',
    },
    missionTitle: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
    },
    '@media screen and (max-width: 1100px)': {
        missionContent: {
            gridTemplateColumns: 'repeat(6, 1fr)',
        },
        missionText: {
            gridColumn: '4 / span 3',
        },
    },
    '@media screen and (max-width: 820px)': {
        missionContent: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        missionText: {
            gridColumn: '1 / span 4',
        },
        missionText1: {
            gridRow: 'auto / span 1',
        },
        missionText2: {
            gridRow: 'auto / span 1',
        },
        missionText3: {
            gridRow: 'auto / span 1',
        },
    },
    '@media screen and (max-width: 520px)': {
        missionContent: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        missionText: {
            gridColumn: '1 / span 3',
        },
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
    const smallImgs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
                <Box className={`${classes.missionContent}`}>

                    <Box className={`${classes.missionWideImage}`}></Box>
                    {smallImgs.map((value, index) => {
                        return <Box className={`${classes.missionSmallImage}`}></Box>
                    })}
                    <Box className={`${classes.missionText1} ${classes.missionText}`}>
                        <Typography className={`${classes.missionTitle}`} variant="body1" component="div">Mission Statement</Typography>
                        {loremIpsum.slice(0,97)}
                    </Box>
                    <Box className={`${classes.missionText2} ${classes.missionText}`}>
                        <Typography className={`${classes.missionTitle}`} variant="body1" component="div">Vision Statement</Typography>
                        {loremIpsum.slice(0,97)}
                    </Box>
                    <Box className={`${classes.missionText3} ${classes.missionText}`}>
                        <Typography className={`${classes.missionTitle}`} variant="body1" component="div">Values</Typography>
                        {loremIpsum.slice(0,97)}
                    </Box>
                </Box>
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
