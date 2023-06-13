import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

//still need to implement functionality of the filters
const useStyles = makeStyles({
  container: {
    background: 'linear-gradient(180deg, #37718E 0%, #285469 100%)',
    borderRadius: '20px',
    display: 'flex',
    gap: '0.8em',
    padding: '30px 0 30px 20px',
  },
  icon: {
    borderRadius: '50%',
    width: 18,
    height: 18,
    backgroundColor: 'white',
    '$root.Mui-focusVisible &': {
      outline: '2px auto white',
      outlineOffset: 3,
    },
    'input:hover ~ &': {
      backgroundColor: 'white',
    },
  },
  checkedIcon: {
    backgroundColor: 'rgba(195, 61, 84, 1)',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage: 'radial-gradient(transparent 40%,#fff 10%)',
      borderRadius: '50%',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: 'rgba(300, 90, 84, 10)',
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props: RadioProps) {
  const classes = useStyles();

  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function SearchCategoryCard() {
  const classes = useStyles();
  let categories = ['All', 'Needs', 'Offers', 'Volunteer Opportunities', 'Nonprofits'];
  return (
    <FormControl component="fieldset">
      <RadioGroup
        className={classes.container}
        defaultValue="female"
        aria-label="gender"
        name="customized-radios"
      >
        {categories.map((t) => (
          <FormControlLabel
            key={t}
            value={t}
            control={<StyledRadio color="secondary" size="medium" />}
            label={<span style={{ fontSize: '18px', color: 'white' }}>{t}</span>}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
