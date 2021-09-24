import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CustomTextField, CustomRadio, CustomSelect, CustomFileUpload } from './FormElements';

const categories = [
    { value: 'figs', text: 'Figs' },
    { value: 'peaches', text: 'Peaches' },
    { value: 'pears', text: 'Pears' },
];
const conditions = [
    { value: 'like-new', text: 'Like New' },
    { value: 'excellent', text: 'Excellent' },
    { value: 'good', text: 'Good' },
];
const needTypes = [
    { value: 'donation', text: 'Donation' },
    { value: 'short-term', text: 'Short term loan (<1 month)' },
    { value: 'long-term', text: 'Long term loan (>1 month)' },
];
const deliveryTypes = [
    { value: 'pick-up', text: 'Pick up only' },
    { value: 'drop-off', text: 'Drop off only' },
    { value: 'pick-up-drop-off', text: 'Pick up and drop off' },
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
    condition: string;
    quantity: string;
    needType: string;
    deliveryMethod: string;
}

const initialFormData: ShareANeedData = {
    title: '',
    location: '',
    description: '',
    category: '',
    condition: '',
    quantity: '',
    needType: '',
    deliveryMethod: '',
};

function NeedForm() {
    const classes = useStyles();

    const [ formData, setFormData ] = React.useState(initialFormData);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value }: { name: string; value: string } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    return (
        <>
            <Container className={classes.formBox}>
                <Typography variant="h2" component="h2" align="left">Share a Need: Goods</Typography>
                <Box className={classes.borderBox}>
                <form className={classes.root}>
                    <Grid container spacing={5} className={classes.grid}>
                        <Grid item md={8} xs={12}>
                            <CustomTextField
                                id="title"
                                label="Title"
                                placeholder="What goods do you need?"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <CustomTextField
                                id="location"
                                label="Location"
                                placeholder="City, State"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <CustomTextField
                                id="description"
                                label="Description"
                                placeholder="Describe what goods you are looking for"
                                value={formData.description}
                                onChange={handleChange}
                                multiline={true}
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <CustomSelect
                                id="category"
                                label="Category"
                                placeholder="Select a category"
                                options={categories}
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <CustomSelect
                                id="condition"
                                label="Condition"
                                placeholder="Select a preferred condition"
                                options={conditions}
                                value={formData.condition}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <CustomTextField
                                id="quantity"
                                label="Quantity"
                                placeholder="# of goods needed"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <CustomRadio
                                label="Need Type"
                                id="needType"
                                options={needTypes}
                                value={formData.needType}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <CustomRadio
                                label="Delivery Method"
                                id="deliveryMethod"
                                options={deliveryTypes}
                                value={formData.deliveryMethod}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomFileUpload
                                label="Photos"
                                id="photos"
                                text="Click here to upload photos"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item container xs={12} className={classes.submitbuttons}>
                            <Grid item>
                                <Button variant='contained' color='secondary'>
                                    Save Draft
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary'>
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

export default NeedForm;
