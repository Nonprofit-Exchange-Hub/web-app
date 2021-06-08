import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import type { Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    hero: {
        backgroundImage: 'url("https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png")',
        backgroundSize: '100%',
        backgroundPosition: 'center center',
        minHeight: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        '&:hover': {
            backgroundColor: 'inherit',
        },
    },
    divider: {
        height: 42,
        margin: 4,
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        background: 'white',
        borderRadius: '10px',
        marginTop: '20px',
        width: '50%',
    },
    heroText: {
        margin: 'auto',
        textAlign: 'left',
    },
    heroContent: {
        width: '60%',
        marginLeft: '10%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 90,
    },
    select: {
        '&:before': {
            borderBottom: 'none',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        }
    },
}));


function Home(): JSX.Element {
    const classes = useStyles();
    const [selectedSearchCategory, setSelectedSearchCategory] = React.useState<string>('');

    const selectSearchCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedSearchCategory(event.target.value as string);
    };

    return (
        <>
            <div className={classes.hero}>
                <div className={classes.heroContent}>
                    <Typography className={classes.heroText} variant="h3" component="h1" color="textPrimary">
                        Support local nonprofits through the giving economy.
                    </Typography>
                    <div className={classes.searchBar}>
                        <FormControl className={classes.formControl}>
                            <Select
                                displayEmpty
                                value={selectedSearchCategory}
                                onChange={selectSearchCategory}
                                renderValue={(value: any) => value || 'Search for'}
                                className={classes.select}
                            >
                                <MenuItem value="Goods">Goods</MenuItem>
                                <MenuItem value="Services">Services</MenuItem>
                            </Select>
                        </FormControl>
                        <Divider className={classes.divider} orientation="vertical" />
                        <InputBase
                            className={classes.input}
                            placeholder="ex. diapers"
                            inputProps={{ 'aria-label': 'ex. diapers' }}
                        />
                        <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
