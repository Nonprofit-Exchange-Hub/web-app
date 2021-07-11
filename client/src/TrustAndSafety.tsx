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
        height: 500,
    },
    guidelinesContainer: {
        backgroundColor: '#EBEBEB',
        overflow: 'hidden',
    },
    guidelinesContent: {
        position: 'relative',
        zIndex: 10,
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
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingTop: '50px',
        paddingBottom: '50px',
        maxWidth: '1200px',
    },
    buttonRow: {
        '& > div': {
            margin: '10px',
        }
    },
    trustListItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '400px',
        '& > div': {
            marginLeft: '10px',
            marginRight: '10px',
        }
    },
    imagePlaceholder: {
        width: '168px',
        height: '168px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    trustTitle: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
        marginBottom: '7px',
        marginTop: '50px',
    },
    trustText: {
        fontSize: '1.4rem',
        textAlign: 'left',
        paddingBottom: '50px',
    },
    bigSpacer: {
        height: '400px',
    },
}));

function TrustAndSafety() {
    const classes = useStyles();

    return (
        <>
            <Box className={`${classes.titleBox} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Trust, Safety, & Privacy
                </Typography>
                <Typography className={classes.headerText} variant="body1" component="div">
                    {loremIpsum}
                </Typography>
            </Box>
            <Box className={`${classes.guidelinesContainer}`}>
                <Box className={`${classes.guidelinesContent} ${classes.mainPageSection}`}>
                    <Typography className={classes.header} variant="h3" component="h3" align="center">
                        Our Community Guidelines
                    </Typography>
                    <Typography className={classes.headerText} variant="body1" component="div">
                        {loremIpsum}
                    </Typography>
                    <Box className={`${classes.row} ${classes.buttonRow}`}>
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
            <Box className={`${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Why was NEH created?
                </Typography>
                <Typography className={classes.headerText} variant="body1" component="div">
                    {loremIpsum}
                    {loremIpsum}
                </Typography>
            </Box>
            <Box className={classes.bigSpacer}></Box>
            <Box className={`${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Trust
                </Typography>
                <Box className={`${classes.row}`}>
                    <Box className={classes.trustListItem}>
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            No Scams
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            {loremIpsum.slice(0,50)}.
                        </Typography>
                    </Box>
                    <Box className={classes.trustListItem}>
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            Always be honest
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            {loremIpsum.slice(0,50)}.
                        </Typography>
                    </Box>
                    <Box className={classes.trustListItem}>
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            No misrepresentation
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            {loremIpsum.slice(0,50)}.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TrustAndSafety;
