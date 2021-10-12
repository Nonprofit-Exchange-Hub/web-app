import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { TextField, RadioGroup, Select } from './FormElements';

const skillCategories = [
    { value: 'purple', text: 'Purple' },
    { value: 'blue', text: 'Blue' },
    { value: 'green', text: 'Green' },
    { value: 'yellow', text: 'Yellow' },
    { value: 'orange', text: 'Orange' },
    { value: 'red', text: 'Red' },
];

const availabilityNeeded = [
    { value: 'one-time', text: 'One-time event' },
    { value: '0-3-months', text: 'Up to 3 months' },
    { value: '3-6-months', text: '3 - 6 months' },
    { value: 'over-6-months', text: 'Longer than 6 months' },
    { value: 'flexible', text: 'On a flexible basis' },
];

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary,
            marginTop: '1rem',
            marginBottom: '14px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: `1px solid ${theme.custom.form.borderColor}`,
                borderRadius: theme.custom.form.borderRadius,
            },
        },
        '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: theme.palette.text.primary,
        },
        '& .MuiSelect-root em': {
            color: theme.palette.text.secondary,
        },
        '& .MuiRadio-root': {
            padding: '2px 9px',
        },
    },
    formBox: {
        width: '100%',
        padding: '0 2rem 4rem 2rem',
        marginTop: '3rem',
        '& h2': {
            width: '100%',
        },
    },
    borderBox: {
        width: '100%',
        border: '1px solid #C4C4C4',
        padding: '4rem 7rem',
        boxSizing: 'border-box',
    },
    submitbuttons: {
        justifyContent: 'center',
        '& .MuiButton-root': {
            margin: '0.5rem 1rem',
            borderRadius: '10px',
        },
    },
}));

interface ShareANeedData {
    title: string;
    location: string;
    description: string;
    category: string;
    numVolunteers: string;
    availabilityNeeded: string;
}

const initialFormData: ShareANeedData = {
    title: '',
    location: '',
    description: '',
    category: '',
    numVolunteers: '',
    availabilityNeeded: '',
};

function NeedFormVolunteers() {
    const classes = useStyles();

    const [ formData, setFormData ] = React.useState<ShareANeedData>(initialFormData);

    // HTMLInputElement does not work for the MUISelect - This works, but can we find a better way of doing it?
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
        let { name = '', value }: { name?: string | undefined; value: unknown } = event.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    return (
        <>
            <Container className={classes.formBox}>
                <Typography variant="h2" component="h2" align="left">Share a Need: Volunteers</Typography>
                <Box className={classes.borderBox}>
                <form className={classes.root}>
                    <Grid container spacing={5}>
                        <Grid item md={8} xs={12}>
                            <TextField
                                id="title"
                                label="Title"
                                placeholder="What goods do you need?"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                id="location"
                                label="Location"
                                placeholder="City, State"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                id="description"
                                label="Description"
                                placeholder="Describe the skills you are looking for"
                                value={formData.description}
                                onChange={handleChange}
                                isMultiline={true}
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Select
                                id="category"
                                label="Category"
                                placeholder="Select a category"
                                options={skillCategories}
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                id="numVolunteers"
                                label="# of Volunteers"
                                placeholder="How many volunteers?"
                                value={formData.numVolunteers}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <RadioGroup
                                label="Volunteer Availability Needed"
                                id="availabilityNeeded"
                                options={availabilityNeeded}
                                value={formData.availabilityNeeded}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item container xs={12} className={classes.submitbuttons}>
                            <Grid item>
                                <Button variant="contained" color="secondary">
                                    Save Draft
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    Submit Need
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                </Box>
            </Container>
        </>
    );
}

export default NeedFormVolunteers;
