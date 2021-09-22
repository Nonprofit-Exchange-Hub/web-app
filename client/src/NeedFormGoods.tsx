import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { Radio, RadioGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CustomTextField } from './FormElements';

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
    radio: {
        marginTop: '4px',
    },
    upload: {
        width: '100%',
        border: `1px solid ${theme.custom.form.borderColor}`,
        borderRadius: '10px',
        padding: '10px',
        marginTop: '8px',
        '& .MuiButton-label': {
            textAlign: 'center',
        },
    },
    submitbuttons: {
        justifyContent: 'center',
        '& .MuiButton-root': {
            margin: '0.5rem 1rem',
            borderRadius: '10px',
        },
    },
}));

function NeedForm() {
    const classes = useStyles();

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
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <CustomTextField
                                id="location"
                                label="Location"
                                placeholder="City, State"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <CustomTextField
                                id="description"
                                label="Description"
                                placeholder="Describe what goods you are looking for"
                                multiline={true}
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    id="category"
                                    variant="outlined"
                                    autoWidth={true}
                                    input={<OutlinedInput />}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    displayEmpty
                                    renderValue={(selected: string) => {
                                      if (!selected) {
                                        return <em>Select a category</em>;
                                      }
                                      return selected;
                                    }}
                                    MenuProps={{
                                        anchorOrigin: {
                                          vertical: "bottom",
                                          horizontal: "left"
                                        },
                                        transformOrigin: {
                                          vertical: "top",
                                          horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                      }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select a category</em>
                                    </MenuItem>
                                    <MenuItem key="one" value='One'>One</MenuItem>
                                    <MenuItem key="two" value='Two'>Two</MenuItem>
                                    <MenuItem key="three" value='Three'>Three</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <FormControl>
                                <FormLabel>Condition</FormLabel>
                                <Select
                                    id="condition"
                                    variant="outlined"
                                    autoWidth={true}
                                    input={<OutlinedInput />}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    displayEmpty
                                    MenuProps={{
                                        anchorOrigin: {
                                          vertical: "bottom",
                                          horizontal: "left"
                                        },
                                        transformOrigin: {
                                          vertical: "top",
                                          horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                      }}
                                    renderValue={(selected: string) => {
                                      if (!selected) {
                                        return <em>Select a preferred condition</em>;
                                      }
                                      return selected;
                                    }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select a preferred condition</em>
                                    </MenuItem>
                                    <MenuItem key="one" value='Like New'>Like New</MenuItem>
                                    <MenuItem key="two" value='Very Good'>Very Good</MenuItem>
                                    <MenuItem key="three" value='Good'>Good</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <CustomTextField
                                id="quantity"
                                label="Condition"
                                placeholder="# of goods needed"
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel>Need Type</FormLabel>
                                <RadioGroup
                                    name="need-type-group"
                                    className={classes.radio}
                                >
                                    <FormControlLabel value="donation" control={<Radio />} label="Donation" />
                                    <FormControlLabel value="short-term" control={<Radio />} label="Short-term loan (<1 month)" />
                                    <FormControlLabel value="long-term" control={<Radio />} label="Long-term loan (>1 month)" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl>
                                <FormLabel>Delivery Method</FormLabel>
                                <RadioGroup
                                    name="delivery-method-group"
                                    className={classes.radio}
                                >
                                    <FormControlLabel value="pick-up" control={<Radio />} label="Pick up only" />
                                    <FormControlLabel value="drop-off" control={<Radio />} label="Drop off only" />
                                    <FormControlLabel value="either" control={<Radio />} label="Pick up or drop off" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel>Photos</FormLabel>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button component="span" className={classes.upload}>
                                    Drag and drop to upload photos<br />
                                    or<br />
                                    browse to add photos
                                </Button>
                            </label> 
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
