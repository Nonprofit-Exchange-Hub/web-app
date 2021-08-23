import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles<Theme, QuestionListProps> ({
    questionList: {
        width: '100%',
    },
});

type QuestionListProps = {
    questionList: { question: string, answer: string }[],
};

function QuestionList(props: QuestionListProps) {
    const classes = useStyles(props);
    
    return (
        <>
            {props.questionList.map((questionItem) => {
                return <Question question={questionItem.question} answer={questionItem.answer}></Question>
            })}
        </>
    );
};


// SUB-COMPONENT Question

const questionStyles = makeStyles<Theme, QuestionProps> ({
    questionWrapper: {
        boxShadow: 'none',
        borderBottom: '1px solid black',
        '& .MuiTypography-body1': {
            fontSize: '1.2rem',
        },
        '&.MuiAccordion-root:before': {
            backgroundColor: 'transparent',
        },
        // Overrides to remove extra margin when answer is displayed
        '&.Mui-expanded': {     
            margin: '0',    
            '& .MuiAccordionSummary-root': {
                minHeight: '52px',
                '& .MuiAccordionSummary-content': {
                    margin: '12px 0',
                },
            },
        },
        '& .MuiAccordionSummary-root, & .MuiAccordionSummary-content': {    // Removes a 1px movement glitch
            transition: 'none',
        }
        // End overrides
    },
    questionSummary: {
        '& p': {
            fontWeight: 'bold',
        },
        '&:hover': {
            backgroundColor: 'rgba(240, 240, 240, 0.5)',
        },
    },
});

type QuestionProps = {
    question: string,
    answer: string,
};

function Question(props: QuestionProps) {
    const classes = questionStyles(props);

    return (
        <Accordion square={true} className={classes.questionWrapper}>
            <AccordionSummary
                expandIcon={<AddCircleTwoToneIcon />}
                aria-controls="panel-content"
                id="panel-header"
                className={classes.questionSummary}
            >
                <Typography align="left">{props.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography align="left">{props.answer}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default QuestionList;
