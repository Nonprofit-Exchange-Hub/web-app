import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

import type { Theme } from '@mui/material/styles';

const instructionStyles = makeStyles<Theme, InstructionProps>((theme: Theme) => ({
  gridBoxes: {
    '& > div': {
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
      '& .MuiTypography-body1': {
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'left',
      },
    },
  },
}));

type InstructionProps = {
  instructionList: { title: string; body: string; image: string }[];
};

function InstructionGrid(props: InstructionProps) {
  const classes = instructionStyles(props);

  return (
    <Grid container justifyContent="space-between" className={`${classes.gridBoxes}`}>
      {props.instructionList.map((instructionItem, index) => {
        var text = <GridText title={instructionItem.title} body={instructionItem.body} />;
        var image = <GridImage image={instructionItem.image} />;
        return (
          <React.Fragment key={`${instructionItem.title}_${index}`}>
            {/* Set order of the two jsx items - odd number rows have text first, even have image first */}
            {index % 2 === 0 ? image : text}
            {index % 2 === 0 ? text : image}
          </React.Fragment>
        );
      })}
    </Grid>
  );
}

// SUB-COMPONENT GridImage

type ImageProps = {
  image: string;
};

function GridImage(props: ImageProps) {
  return (
    <Grid item sm={6} xs={12}>
      <img src={props.image} alt="placeholder"></img>
    </Grid>
  );
}

// SUB-COMPONENT GridText

type TextProps = {
  title: string;
  body: string;
};

function GridText(props: TextProps) {
  return (
    <Grid item sm={6} xs={12}>
      <Typography variant="h3" component="h3" align="left">
        {props.title}
      </Typography>
      <Typography variant="body1" component="div" align="left">
        {props.body}
      </Typography>
    </Grid>
  );
}

export default InstructionGrid;
