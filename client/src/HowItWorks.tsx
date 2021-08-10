import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import QuestionList from './QuestionList';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const nonprofitQuestions = [
    {question: 'Can we post for volunteer help?', answer: loremIpsum.slice(0,100)},
    {question: 'Can we keep working with a person we exchanged with?', answer: loremIpsum.slice(0,100)},
    {question: 'How do we see what has been donated previously?', answer: loremIpsum.slice(0,100)},
];

const citizenQuestions = [
    {question: 'Can I offer to volunteer?', answer: loremIpsum.slice(0,100)},
    {question: 'Can I keep working with a nonprofit I exchanged with?', answer: loremIpsum.slice(0,100)},
];

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
        '& h3': {
            fontSize: '1.6em',
            width: '100%',
        },
    },
    limitWidth: {
        margin: 'auto',
        width: '100%',
        maxWidth: '1100px',
    },
    // page specific styles
    questionSection: {
        margin: '0 auto',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greySection: {
        backgroundColor: '#C4C4C4',
    },
    columns: {
        display: 'flex',
    },
    titleBox: {
        height: 200,
        backgroundColor: 'yellow',
    },
    tabs: {
        margin: 'auto',
        padding: '0',
        borderBottom: '1px solid #C4C4C4',
        '& $grid > div': {
            paddingBottom: '0',

        },
    },
    grid: {
    },
    gridBox: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: '3rem',
        '& img': {
            maxWidth: '100%',
            height: 'auto',
        },
        '& h3': {
            paddingBottom: '1em',
        },
    },
    button: {
        fontSize: '2rem',
        margin: '20px 0 0 0',
        borderBottom: '11px solid #FFFFFF',
    },
    hidden: {
        display: 'none',
    },
    selected: {
        borderBottom: '11px solid #C4C4C4',
    },
    nonprofitContainer: {
        // height: 200,
        // backgroundColor: 'blue',
    },
    citizenContainer: {
        // height: 200,
        // backgroundColor: 'red',
    },
    questions: {
        alignSelf: 'flex-end',
        width: '100%',
        maxWidth: '700px',
    },
}));

function HowItWorks() {
    const classes = useStyles();

    const [ tabSelected, setTabSelected ] = React.useState("nonprofit");

    const handleClickTab = (tabName: string) => {
        setTabSelected(tabName);
    };

    return (
        <>
            <Box className={`${classes.titleBox} ${classes.mainPageSection}`}>
            </Box>

            <Box className={`${classes.tabs}`}>
                <Grid container justify='space-between' spacing={0} className={`${classes.limitWidth}`}>
                    <Grid container item sm={5} xs={12}
                        onClick={() => handleClickTab("nonprofit")}
                    >
                        <h3 className={`${classes.button} ${tabSelected === "nonprofit" ? classes.selected : ''}`}
                        >I'm on a nonprofit team</h3>
                    </Grid>
                    <Grid container item sm={5} xs={12}
                        onClick={() => handleClickTab("citizen")}
                    >
                        <h3 className={`${classes.button} ${tabSelected === "citizen" ? classes.selected : ''}`}
                        >I'm a citizen</h3>
                    </Grid>
                </Grid>
            </Box>

            <Box className={`${classes.nonprofitContainer} ${classes.mainPageSection} ${tabSelected !== "nonprofit" ? classes.hidden : ''}`}>
                <Grid container justify='space-between' spacing={3} className={`${classes.limitWidth}`}>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                        1. Post your Need.
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <img src="https://picsum.photos/600" alt="placeholder"></img>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <img src="https://picsum.photos/600" alt="placeholder"></img>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                        2. Connect with donors.
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                        3. Accomplish Goal.
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <img src="https://picsum.photos/600" alt="placeholder"></img>
                    </Grid>
                </Grid>
            </Box>

            <Box className={`${classes.citizenContainer} ${classes.mainPageSection} ${tabSelected !== "citizen" ? classes.hidden : ''}`}>
                <Grid container justify='space-between' spacing={3} className={`${classes.limitWidth}`}>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                        1. Post your donation
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <img src="https://picsum.photos/seed/picsum/600" alt="placeholder"></img>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <img src="https://picsum.photos/seed/picsum/600" alt="placeholder"></img>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                        2. Connect with nonprofits
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                        3. Make a difference
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {loremIpsum}
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12} className={`${classes.gridBox}`}>
                        <img src="https://picsum.photos/seed/picsum/600" alt="placeholder"></img>
                    </Grid>
                </Grid>
            </Box>

            <Box className={`${classes.greySection} ${classes.mainPageSection} ${tabSelected !== "citizen" ? classes.hidden : ''}`}>
                <Box className={`${classes.limitWidth}`}>
                    <Typography variant="h3" component="h3" align="left">
                        We're helping you make a difference in your community.
                    </Typography>
                </Box>
            </Box>
            <Box className={`${classes.greySection} ${classes.mainPageSection} ${tabSelected !== "nonprofit" ? classes.hidden : ''}`}>
                <Box className={`${classes.limitWidth}`}>
                    <Typography variant="h3" component="h3" align="left">
                        Whatever your nonprofit goal, we're here to help.
                    </Typography>
                </Box>
            </Box>

            <Box className={`${classes.mainPageSection}`}>
                <Box className={`${classes.limitWidth} ${classes.questionSection}`}>
                    <Typography variant="h3" component="h3" align="left">
                        Still have questions?
                    </Typography>
                    <Box className={classes.questions}>
                        <QuestionList questionList={tabSelected === "nonprofit" ? nonprofitQuestions : citizenQuestions}></QuestionList>
                    </Box>
                </Box>
            </Box>

        </>
    );
}



export default HowItWorks;
