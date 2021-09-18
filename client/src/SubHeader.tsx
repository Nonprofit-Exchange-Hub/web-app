import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

import type { Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px 5%',
        borderRadius: 0,
        alignItems: 'center',
    },
    searchInput: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
    },
    iconButton: {
        padding: 10,
        '&:hover': {
            backgroundColor: 'inherit',
            borderRadius: '10px',
        },
        textDecoration: 'none',
    },
}));

type Props = {
  backTo: string,
  searchTo: string,
};


function SubHeader(props: Props): JSX.Element {
    const classes = useStyles();
    const { backTo, searchTo } = props;

    const [searchText, setSearchText] = React.useState<string>('');

    return (
        <Paper elevation={0} className={classes.wrapper}>
            <NavLink to={backTo} className={classes.iconButton}>
                <Button><ArrowBackRoundedIcon />Go Back</Button>
            </NavLink>
            <Paper className={classes.searchInput}>
                <InputBase
                    placeholder="ex. diapers"
                    inputProps={{ 'aria-label': 'ex. diapers' }}
                    type="text"
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchText(e.target.value)}
                />
                <NavLink to={`${searchTo}?search=${searchText}`} className={classes.iconButton}>
                    <SearchIcon />
                </NavLink>
            </Paper>
        </Paper>
    );
}

export default SubHeader;
