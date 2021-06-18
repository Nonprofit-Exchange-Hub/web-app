import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import * as queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import NeedsAndOffers from './NeedsAndOffers';
import FilterGroup from './FilterGroup';

import type { Theme } from '@material-ui/core/styles';
import type { Asset as AssetT } from './types';


const placeholderImg = 'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png';
const dumbyData: AssetT[] = [1, 2, 3].map(num => ({
    id: num,
    title: `title ${num}`,
    category: `category ${num}`,
    datePosted: `datePosted ${num}`,
    location: `location ${num}`,
    img: placeholderImg,
}));
const filters1 = ['filter 1', 'filter 2', 'filter 3'];
const filters2 = ['filter 4', 'filter 5', 'filter 6'];
const filters3 = ['filter 7', 'filter 8', 'filter 9'];

const useStyles = makeStyles((theme: Theme) => ({
    searchBar: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px 5%',
        borderRadius: 0,
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
        '&:hover': {
            backgroundColor: 'inherit',
            borderRadius: '10px',
        },
    },
    searchInput: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    leftPanel: {
        borderRight: '1px solid grey',
        width: '20%',
    },
    createBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '10px 5%',
        width: '80%',
    },
    makeAPost: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
    },
}));


function Assets(): JSX.Element {
    const classes = useStyles();
    const location = useLocation();
    const querySearchText = queryString.parse(location.search).search;
    const [searchText, setSearchText] = React.useState<string>(querySearchText as string || '');
    const [selectedFilters, setSelectedFilters] = React.useState<{ [key: string]: boolean }>({});

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilters({
            ...selectedFilters,
            [event.target.value]: event.target.checked,
        })
    };

    React.useEffect(() => {
      // fetch assets with querySearchText
    }, [location])

    console.log(selectedFilters)

    return (
        <>
            <Paper className={classes.searchBar}>
                <>
                    X of Y results for "{querySearchText}"
                </>
                <Paper className={classes.searchInput}>
                    <InputBase
                        placeholder="ex. diapers"
                        inputProps={{ 'aria-label': 'ex. diapers' }}
                        type="text"
                        value={searchText}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchText(e.target.value)}
                    />
                    <NavLink to={`/assets?search=${searchText}`} className={classes.iconButton}>
                        <SearchIcon />
                    </NavLink>
                </Paper>
            </Paper>
            <div className={classes.contentWrapper}>
                <div className={classes.leftPanel}>
                    <FilterGroup
                        header="Location"
                        onHandleCheck={handleCheck}
                        filters={filters1}
                        selectedFilters={selectedFilters}
                    />
                    <FilterGroup
                        header="Category"
                        onHandleCheck={handleCheck}
                        filters={filters2}
                        selectedFilters={selectedFilters}
                    />
                    <FilterGroup
                        header="Nonprofit"
                        onHandleCheck={handleCheck}
                        filters={filters3}
                        selectedFilters={selectedFilters}
                    />
                </div>
                <div className={classes.rightPanel}>
                    <Paper elevation={0} className={classes.createBar}>
                        <NavLink className={classes.makeAPost} to="/create">
                            <Button color="primary" variant="contained">Make a Post</Button>
                        </NavLink>
                    </Paper>
                    <NeedsAndOffers
                        headerText="Nonprofit Needs"
                        cards={dumbyData}
                    />
                    <NeedsAndOffers
                        headerText="Offers"
                        cards={dumbyData}
                    />
                </div>
            </div>
        </>
    );
}

export default Assets;
