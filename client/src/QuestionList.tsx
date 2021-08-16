import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
        borderBottom: '1px solid black',
        '& span': {
            fontSize: '1.2rem',
        }
    },
    question: {
        '& span': {
            fontWeight: 'bold',
        },
    },
    answer: {
    },
});

type QuestionProps = {
    question: string,
    answer: string,
};

function Question(props: QuestionProps) {
    const classes = questionStyles(props);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
      
    return (
        <List
            component="nav"
            aria-label="questions"
            className={classes.questionWrapper}
        >
            <ListItem button disableGutters onClick={handleClick} className={classes.question}>
            <ListItemText primary={props.question} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem className={classes.answer}>
                    <ListItemText primary={props.answer} />
                </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default QuestionList;
