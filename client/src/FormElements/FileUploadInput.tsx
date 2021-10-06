import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Button } from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    upload: {
        width: '100%',
        border: `1px solid ${theme.custom.form.borderColor}`,
        borderRadius: theme.custom.form.borderRadius,
        padding: '10px',
        marginTop: '8px',
        '& .MuiButton-label': {
            textAlign: 'center',
        },
    },
}));

type CustomProps = {
    id: string,
    label: string,
    text: string,
    onChange: (event: any) => void,
};

function FileUploadInput(props: CustomProps) {
    const classes = useStyles();

    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                name={props.id}
                id="raised-button-file"
                multiple
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button component="span" className={classes.upload}>
                    {props.text}
                </Button>
            </label> 
        </FormControl>
    );
}

export default FileUploadInput;