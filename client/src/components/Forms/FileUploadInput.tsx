import { makeStyles } from 'tss-react/mui';
import { FormControl, FormLabel, Button } from '@mui/material';

import type { Theme } from '@mui/material/styles';
import { CTAHeroButton, PrimaryCTAButton } from '../Buttons/Button';

const useStyles = makeStyles()((theme: Theme) => ({
  buttonText: {
    width: '100%',
    border: `1px solid grey`,
    borderRadius: '10px',
    padding: '10px',
    marginTop: '8px',
    '& .MuiButton-label': {
      textAlign: 'center',
    },
  },
}));

type CustomProps = {
  id: string;
  label: string;
  text: string;
  buttonVariant?: 'CTAHeroButton' | 'primaryCTAButton';
  onChange: (event: any) => void;
};

function FileUploadInput(props: CustomProps) {
  const { classes } = useStyles();

  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        name={props.id}
        id="raised-button-file"
        multiple
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor="raised-button-file">
        {props.buttonVariant === 'primaryCTAButton' ? (
          <PrimaryCTAButton text={props.text}></PrimaryCTAButton>
        ) : props.buttonVariant === 'CTAHeroButton' ? (
          <CTAHeroButton text={props.text}></CTAHeroButton>
        ) : (
          <Button component="span" className={classes.buttonText}>
            {props.text}
          </Button>
        )}
      </label>
    </FormControl>
  );
}

export default FileUploadInput;
