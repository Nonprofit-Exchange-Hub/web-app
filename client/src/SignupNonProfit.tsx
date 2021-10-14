import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import { placeholderImg } from './assets/temp';
import StyledLink from './StyledLink';
import { TextField, Select } from './FormElements';
import { Button } from '@material-ui/core';


const exemptions = [
    { value: 'charitable', text: 'Charitable Organization' },
    { value: 'religious', text: 'Religious Organization' },
    { value: 'private', text: 'Private Foundations' },
    { value: 'political', text: 'Political Organizations' },
    { value: 'other', text: 'Other' }
];

const useStyles = makeStyles((theme: Theme) => ({
    sideImg: {
        backgroundImage: `url("${placeholderImg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
    },
    signUpContainer: {
        margin: theme.spacing(5),
    },
    button: {
        borderRadius: 0,
        height: 62,
        textTransform: 'none',
        backgroundColor: '#C4C4C4',
        color: 'white',
    },
    header: { fontWeight: 'bold' },
    input: {
        height: 62,
        border: '1px solid #C4C4C4',
        boxSizing: 'border-box',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontSize: 18,
        marginBottom: 20,
    },
    label: {
        color: '#000000',
        textAlign: 'left',
    },
}));

interface SignupData {
    org_name: string;
    city: string;
    state: string;
    ein: string;
    tax_exempt_id: string;
    nonprofit_classification: string;
    first_name: string;
    last_name: string;
    role_or_title: string;
    email: string;
    password: string;
    accept_terms: string;
}

const initialFormData: SignupData = {
    org_name: '',
    city: '',
    state: '',
    ein: '',
    tax_exempt_id: '',
    nonprofit_classification: '',
    first_name: '',
    last_name: '',
    role_or_title: '',
    email: '',
    password: '',
    accept_terms: 'false'
};

function SignupNonProfit() {
    const classes = useStyles();

    const [ formData, setFormData ] = React.useState(initialFormData);
    const [ pageNum, setPageNum ] = React.useState(1);

    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = evt.target;

        setFormData((fData) => {
            return {
                ...fData,
                [name]: type === 'checkbox' ? evt.target.checked : value
            };
        });
    };

    //Had to make second handler for HTMLSelectElement vs HTMLInputElement
    //checked property does not exist on HTMLSelectElement, and so general handler does not work.
    const handleSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = evt.target;

        setFormData((fData) => {
            return {
                ...fData,
                [name]: value
            };
        });
    };

    const handleNextClick = () => setPageNum(2);
    const handleSignupClick = () => {
        console.log('signup clicked', formData);
    };

    return (
        <React.Fragment>
            <Grid container>
                <Grid className={classes.sideImg} item xs={5} />
                <Grid container className={classes.signUpContainer} item direction="column" xs={6}>
                    <Typography className={classes.header} variant="h4" component="h1" align="left" gutterBottom>
                            Let's get started.
                    </Typography>
                    <Typography component="p" align="left" gutterBottom>
                        Already have an account? <StyledLink to="/login">Log In</StyledLink>
                    </Typography>
                {pageNum === 1 ? (
                    <div>
                     <Grid container spacing={5}>
                        <Grid item>
                            <Typography component="p" align="left">
                                Step 1: About your organization
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                                <TextField
                                    id="org_name"
                                    label="Organization Name"
                                    placeholder="Organization"
                                    value={formData.org_name}
                                    onChange={handleFieldChange}
                                />
                        </Grid>
                        <Grid item md={6} xs={12}>
                                <TextField
                                    id="city"
                                    label="City"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleFieldChange}
                                />
                        </Grid>
                        <Grid item md={6} xs={12}>
                                <TextField
                                    id="state"
                                    label="State"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleFieldChange}
                                />
                        </Grid>
                        <Grid item md={8} xs={12}>
                                <TextField
                                    id="state"
                                    label="Entity Identification Number (EIN)"
                                    placeholder="EIN"
                                    value={formData.ein}
                                    onChange={handleFieldChange}
                                />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Select
                                id="nonprofit_classification"
                                label="IRS Nonprofit Organization Classification"
                                placeholder="Select classification"
                                options={exemptions}
                                value={formData.nonprofit_classification}
                                onChange={handleSelectChange}
                            />
                        </Grid>
                            <Grid item md={8} xs={12}>
                                    <Button 
                                            onClick={handleNextClick}
                                            className={classes.button}
                                            fullWidth
                                            >
                                            Next
                                    </Button>
                            </Grid> 
                        </Grid>
                        
                    </div>
                ) : (
                    <div>
                        <div>Step 2: About You</div>

                        <div>
                            <span>First Name</span>
                            <span>Last Name</span>
                        </div>
                        <div>
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleFieldChange} />
                            <input type="text" name="last_name" value={formData.last_name} onChange={handleFieldChange} />
                        </div>

                        <div>
                            <span>Role / Title</span>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="role_or_title"
                                value={formData.role_or_title}
                                onChange={handleFieldChange}
                            />
                        </div>

                        <div>
                            <span>Email Address</span>
                        </div>
                        <div>
                            <input type="text" name="email" value={formData.email} onChange={handleFieldChange} />
                        </div>

                        <div>
                            <span>Password (6 or more characters)</span>
                        </div>
                        <div>
                            <input type="text" name="password" value={formData.password} onChange={handleFieldChange} />
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                name="accept_terms"
                                id="accept_terms"
                                value={formData.accept_terms}
                                onChange={handleFieldChange}
                            />
                            <label htmlFor="accept_terms">
                                Accept the <a>Terms and Agreements</a>
                            </label>
                        </div>
                        <div>
                            <button onClick={handleSignupClick}>Sign Up</button>
                        </div>
                    </div>
                )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SignupNonProfit;
