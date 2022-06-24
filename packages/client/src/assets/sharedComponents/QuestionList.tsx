import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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
    '& .MuiAccordionSummary-root, & .MuiAccordionSummary-content': {
      // Removes a 1px movement glitch
      transition: 'none',
    },
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
}));

type QuestionProps = {
  question: string;
  answer: string;
};

function Question(props: QuestionProps) {
  const classes = questionStyles();

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
}

export default QuestionList;
