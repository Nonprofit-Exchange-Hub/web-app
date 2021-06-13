import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { NavLink } from 'react-router-dom';

import NeedsAndOffers from './NeedsAndOffers';

import type { Theme } from '@material-ui/core/styles';
import type { Assets } from './types';


const placeholderImg = 'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png';
const dumbyData: Assets = [1, 2, 3].map(num => ({
    id: num,
    title: `title ${num}`,
    category: `category ${num}`,
    datePosted: `datePosted ${num}`,
    location: `location ${num}`,
    img: placeholderImg,
}));

const useStyles = makeStyles((theme: Theme) => ({
    hero: {
        backgroundImage: `url("${placeholderImg}")`,
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
            borderRadius: '10px',
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
        width: '80%',
    },
    heroText: {
        margin: 'auto',
        textAlign: 'left',
    },
    heroContent: {
        width: '50%',
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
    videoSection: {
        backgroundColor: '#1fc8db',
        backgroundImage: 'linear-gradient(140deg, #ffffff 0%, #66ffff 50%, #000000 75%)',
        padding: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoSectionText: {
        color: 'white',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '30px',
        lineHeight: '45px',
    },
    videoSectionVideo: {},
    needsAndOffersSub: {
        display: 'flex',
        flexDirection: 'row',
    },
    card: {
        margin: '3%',
    },
    cardImg: {
        borderRadius: '5px',
        margin: '10%',
        maxWidth: '80%',
    },
    needsAndOffersHeader: {
        textAlign: 'left',
    },
    needsAndOffers: {
        padding: '10%',
    },
    faqs: {
        padding: '10%',
    },
    faqsHeader: {
        paddingBottom: '30px',
    },
    cardText1: {
        padding: '0 10%',
    },
    cardText2: {
        padding: '0 10% 10%',
    },
}));


function Home(): JSX.Element {
    const classes = useStyles();
    const [selectedSearchCategory, setSelectedSearchCategory] = React.useState<string>('');
    const [searchText, setSearchText] = React.useState<string>('');

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
                            type="text"
                            value={searchText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchText(e.target.value)}
                        />
                        <NavLink to={`/assets?search=${searchText}`} className={classes.iconButton}>
                            <SearchIcon />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={classes.needsAndOffers}>
                <NeedsAndOffers
                    headerText="Nonprofit Needs"
                    cards={dumbyData}
                />
                <NeedsAndOffers
                    headerText="Offers"
                    cards={dumbyData}
                />
            </div>
            <div className={classes.videoSection}>
                <div className={classes.videoSectionVideo}>
                    <img src={placeholderImg} alt="video placeholder" />
                </div>
                <div className={classes.videoSectionText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper et purus vestibulum consequat.
                </div>
            </div>
            <div className={classes.faqs}>
                <Typography variant="h4" component="h4" className={classes.faqsHeader}>
                    FAQs
                </Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<AddCircleTwoToneIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>How does it work?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<AddCircleTwoToneIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                        <Typography>Who can use the platform?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<AddCircleTwoToneIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                        <Typography>Who can use this platform?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
            </div>
        </>
    );
}

export default Home;
