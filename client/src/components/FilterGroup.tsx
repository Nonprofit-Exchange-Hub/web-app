import * as React from 'react';
import { makeStyles } from 'tss-react/mui';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  wrapper: {
    padding: '0px 0px 5px 0px',
    position: 'relative',
    display: 'inline-block',
  },
  filtersList: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    fontSize: '15px',
  },
  groupHeader: {
    fontSize: '18px',
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
  const { classes } = useStyles();
  const { filters, header, onHandleCheck, selectedFilters } = props;
  let [expand, setExpand] = React.useState<boolean>(false);

  function handleExpand() {
    setExpand(!expand);
  }

  return (
    <div className={classes.wrapper}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="inherit"
          component="h5"
          color="textPrimary"
          className={classes.groupHeader}
        >
          {header}
        </Typography>
        <div onClick={handleExpand} style={{ alignSelf: 'center' }}>
          {expand ? (
            <KeyboardArrowUpIcon fontSize="large" />
          ) : (
            <KeyboardArrowDownIcon fontSize="large" />
          )}
        </div>
      </div>
      {expand ? (
        <div className={classes.filtersList}>
          {filters.map((f) => (
            <FormControlLabel
              key={f}
              control={
                <Checkbox
                  size="small"
                  checked={selectedFilters[f] || false}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox', style: { fontSize: '10px' } }}
                  onChange={onHandleCheck}
                  value={f}
                />
              }
              label={<span style={{ fontSize: '15px' }}>{f}</span>}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FilterGroup;
