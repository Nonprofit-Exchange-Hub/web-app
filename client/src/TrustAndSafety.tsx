import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import SmallDisplayCard from './SmallDisplayCard';

import type { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
    },
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
    },
    whyCreatedContainer: {
    },
    trustContainer: {
    },
    // rows need break point
    buttonRow: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '50px',
        paddingBottom: '50px',
    },
    bigSpacer: {
        height: '400px',
    },
    trustRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '50px',
        paddingBottom: '50px',
        maxWidth: '1200px',
    },
    trustListItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '400px',
        marginLeft: '15px',
        marginRight: '15px',
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
        marginTop: '65px',
    },
    trustText: {
        fontSize: '1.4rem',
        textAlign: 'left',
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
            </Box>
            <Box className={`${classes.guidelinesContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Our Community Guidelines
                </Typography>
                <Typography className={classes.headerText} variant="body1" component="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Box className={classes.buttonRow}>
                    <SmallDisplayCard />
                    <SmallDisplayCard />
                    <SmallDisplayCard />
                </Box>
            </Box>
            <Box className={`${classes.whyCreatedContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Why was NEH created?
                </Typography>
                <Typography className={classes.headerText} variant="body1" component="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.
                </Typography>
            </Box>
            <Box className={classes.bigSpacer}></Box>
            <Box className={`${classes.trustContainer} ${classes.mainPageSection}`}>
                <Typography className={classes.header} variant="h3" component="h3" align="center">
                    Trust
                </Typography>
                <Box className={classes.trustRow}>
                    <Box className={classes.trustListItem}>
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            No Scams
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </Box>
                    <Box className={classes.trustListItem}>
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            Always be honest
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        </Typography>
                    </Box>
                    <Box className={classes.trustListItem}>
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            No misrepresentation
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TrustAndSafety;
