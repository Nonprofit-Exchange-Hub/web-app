import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, ButtonBase } from '@material-ui/core';
import QuestionList from './QuestionList';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const nonprofitInstructionList = [
    {
        title: "1. Post your Need.",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/nonprofit/600',
    },
    {
        title: "2. Connect with donors.",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/nonprofit/600',
    },
    {
        title: "3. Accomplish Goal.",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/nonprofit/600',
    },
];
const citizenInstructionList = [
    {
        title: "1. Post your donation",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/picsum/600',
    },
    {
        title: "2. Connect with nonprofits",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/picsum/600',
    },
    {
        title: "3. Make a difference",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/picsum/600',
    },
];

const nonprofitBulletList = {
    title: "Whatever your nonprofit goal, we're here to help.",
    list: [
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
    ],
};
const citizenBulletList = {
    title: "We're helping you make a difference in your community.",
    list: [
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
    ],
};

const nonprofitQuestions = [
    {question: 'Can we post for volunteer help?', answer: loremIpsum.slice(0,150)},
    {question: 'Can we keep working with a person we exchanged with?', answer: loremIpsum.slice(0,150)},
    {question: 'How do we see what has been donated previously?', answer: loremIpsum.slice(0,150)},
];
const citizenQuestions = [
    {question: 'Can I offer to volunteer?', answer: loremIpsum.slice(0,150)},
    {question: 'Can I keep working with a nonprofit I exchanged with?', answer: loremIpsum.slice(0,150)},
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
        '& .MuiGrid-item': {
            padding: '20px',
            paddingBottom: '0!important',
        },
    },
    grid: {
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
                <Grid container justify='space-between' className={`${classes.limitWidth}`}>
                    <Grid container item sm={6} xs={12}
                        onClick={() => handleClickTab("nonprofit")}
                    >
                        <h3 className={`${classes.button} ${tabSelected === "nonprofit" ? classes.selected : ''}`}
                        >I'm on a nonprofit team</h3>
                    </Grid>
                    <Grid container item sm={6} xs={12}
                        onClick={() => handleClickTab("citizen")}
                    >
                        <h3 className={`${classes.button} ${tabSelected === "citizen" ? classes.selected : ''}`}
                        >I'm a citizen</h3>
                    </Grid>
                </Grid>
            </Box>

            <Box className={`${classes.nonprofitContainer} ${classes.mainPageSection} ${classes.limitWidth}`}>
                <InstructionGrid instructionList={ tabSelected === "nonprofit" ? nonprofitInstructionList : citizenInstructionList }></InstructionGrid>
            </Box>

            <Box className={`${classes.greySection} ${classes.mainPageSection}`}>
                <Box className={`${classes.limitWidth}`}>
                    <Typography variant="h3" component="h3" align="left">
                        { tabSelected === "nonprofit" ? nonprofitBulletList.title : citizenBulletList.title }
                    </Typography>
                    <BulletGrid list={tabSelected === "nonprofit"? nonprofitBulletList.list : citizenBulletList.list}></BulletGrid>
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




// SUB-COMPONENT InstructionGrid

const instructionStyles = makeStyles<Theme, InstructionProps> ({
    headerText: {
        width: '100%',
        maxWidth: '1100px',
        fontSize: '1.3rem',
        textAlign: 'left',
    },
    gridBox: {
        width: '100%',
        overflow: 'hidden',
        padding: '20px',
        '& img': {
            maxWidth: '100%',
            height: 'auto',
        },
        '& h3': {
            paddingBottom: '1em',
        },
    },
});

type InstructionProps = {
    instructionList: { title: string, body: string, image: string }[],
};

function InstructionGrid(props: InstructionProps) {
    const classes = instructionStyles(props);
    var row = 0;

    return (
        <Grid container justify='space-between'>
            {props.instructionList.map((instructionItem) => {
                row++;
                var text = (
                    <Grid item sm={6} xs={12} className={`${classes.gridBox}`}>
                        <Typography variant="h3" component="h3" align="left">
                            {instructionItem.title}
                        </Typography>
                        <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                            {instructionItem.body}
                        </Typography>
                    </Grid>
                );
                var image = (
                    <Grid item sm={6} xs={12} className={`${classes.gridBox}`}>
                        <img src={instructionItem.image} alt="placeholder"></img>
                    </Grid>
                );
                return (
                    <>
                        {/* Set order of the two jsx items - odd number rows have text first, even have image first */}
                        {row % 2 == 0 ? image : text}
                        {row % 2 == 0 ? text : image}
                    </>
                )
            })}
        </Grid>
    );
};



// SUB-COMPONENT BulletGrid

const bulletStyles = makeStyles<Theme, BulletProps> ({
    headerText: {
        width: '100%',
        maxWidth: '1100px',
        fontSize: '1.3rem',
        textAlign: 'left',
    },
    grid: {
        marginTop: '30px',
    },
    square: {
        width: '100px',
        height: '100px',
        backgroundColor: 'white',
        marginRight: '20px',
    },
});

type BulletProps = {
    list: string[],
};

function BulletGrid(props: BulletProps) {
    const classes = bulletStyles(props);

    return (
        <Grid container justify='space-between'>

            {props.list.map((listItem) => {
                return (
                    <Grid container item md={6} xs={12} className={classes.grid}>
                        <Grid item>
                            <Box className={classes.square}></Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1" component="div" align="left" className={`${classes.headerText}`}>
                                {listItem}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })}


        </Grid>
    );
};



export default HowItWorks;
