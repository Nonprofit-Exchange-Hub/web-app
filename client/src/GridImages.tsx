import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const useStyles = makeStyles((theme: Theme) => ({
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
        '&$row1': {
            gridRow: '1 / span 1',
        },
        '&$row2': {
            gridRow: '2 / span 1',
        },
        '&$row3': {
            gridRow: '3 / span 1',
        },
        '&$row4': {
            gridRow: '4 / span 1',
        },
    },
    row1: {
    },
    row2: {
    },
    row3: {
    },
    row4: {
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
            columnGap: '15px',
            rowGap: '15px',
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
        missionWideImage: {
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
}));

// type Props = {
//     missionStatements: [],
// };
  
function GridImages() {
    
    const classes = useStyles();
//     // const { missionStatements } = props;

    const smallImgs = ['sm', 'sm', 'sm', 'sm', 'sm', 'sm', 'sm', 'sm', 'sm'];

    // This needs to be moved into About Us and passed in as props
    let missionStatements = [
        {row: 1, title: 'Mission Statement', text: loremIpsum.slice(0,97)},
        {row: 2, title: 'Vision Statement', text: loremIpsum.slice(0,97)},
        {row: 3, title: 'Values', text: loremIpsum.slice(0,97)},
    ];

    let rowClass = classes.row1;

    return (
        <Box className={`${classes.missionContent}`}>
            <Box className={`${classes.missionWideImage}`}></Box>
            {smallImgs.map((value, index) => {
                return <Box key={"gridImage"+index} className={`${classes.missionSmallImage}`}></Box>
            })}
            {missionStatements.map((statementItem, index) => {
                if (statementItem.row === 1) rowClass = classes.row1;
                if (statementItem.row === 2) rowClass = classes.row2;
                if (statementItem.row === 3) rowClass = classes.row3;
                if (statementItem.row === 4) rowClass = classes.row4;
                return (
                    <>
                        <Box key={"missionStatement"+index} className={`${classes.missionText} ${rowClass}`}>
                            <Typography className={`${classes.missionTitle}`} variant="body1" component="div">{statementItem.title}</Typography>
                            {statementItem.text}
                        </Box>
                    </>
                )
            })}
        </Box>
    );
}

export default GridImages;
