import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    paddingTop: '20px',
  },
  filtersList: {
    marginLeft: '20%',
  },
  groupHeader: {
    fontWeight: 'bold',
    marginLeft: '15%',
  },
}));

type Props = {
  filters: string[];
  header: string;
  onHandleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFilters: { [key: string]: boolean };
};

function FilterGroup(props: Props): JSX.Element {
  const classes = useStyles();
  const { filters, header, onHandleCheck, selectedFilters } = props;

  return (
    <div className={classes.wrapper}>
      <Typography variant="h5" component="h5" color="textPrimary" className={classes.groupHeader}>
        {header}
      </Typography>
      <div className={classes.filtersList}>
        {filters.map((f) => (
          <FormControlLabel
            key={f}
            control={
              <Checkbox
                checked={selectedFilters[f] || false}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onChange={onHandleCheck}
                value={f}
              />
            }
            label={f}
          />
        ))}
      </div>
    </div>
  );
}

export default FilterGroup;
