import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionIcon from './Icons/AccordionIcon';

type QuestionListProps = {
  questionList: { question: string; answer: string }[];
};

function QuestionList(props: QuestionListProps) {
  return (
    <>
      {props.questionList.map((questionItem) => (
        <Question
          key={questionItem.question}
          question={questionItem.question}
          answer={questionItem.answer}
        />
      ))}
    </>
  );
}

// SUB-COMPONENT Question

const questionStyles = makeStyles(() => ({
  questionWrapper: {
    // Overrides MUI Accordian Dividers
    '&:before': {
      display: 'none',
    },
    // Overrides to remove extra margin when answer is displayed
    '&.Mui-expanded': {
      margin: '0',
      marginBottom: '40px',
      '& .MuiAccordionSummary-root': {
        minHeight: '52px',
        '& .MuiAccordionSummary-content': {
          margin: '12px 0',
        },
      },
    },
    '& .MuiAccordionSummary-root, & .MuiAccordionSummary-content': {
      // Removes a 1px movement glitch
      transition: 'none',
      padding: '0',
    },
    '& .MuiAccordion-root:before': {
      height: '0px',
    },
    // End overrides
  },
  questionSummary: {
    flexDirection: 'row-reverse',
    '& p': {
      fontWeight: 'bold',
      marginLeft: '27px',
    },
  },
  answerDetails: {
    '& p': {
      marginLeft: '41px',
    },
  },
}));

type QuestionProps = {
  question: string;
  answer: string;
};

function Question(props: QuestionProps) {
  const classes = questionStyles();

  return (
    <Accordion elevation={0} className={classes.questionWrapper}>
      <AccordionSummary
        expandIcon={<AccordionIcon />}
        aria-controls="panel-content"
        id="panel-header"
        className={classes.questionSummary}
      >
        <Typography align="left">{props.question}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.answerDetails}>
        <Typography align="left">{props.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default QuestionList;
