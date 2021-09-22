import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import { TextField, FormControl, FormLabel } from '@material-ui/core';
import { setDefaults } from '../Helpers';

const useStyles = makeStyles<Theme, CustomProps> ((theme: Theme) => ({

}));

type CustomProps = {
    id: string,
    label: string,
    placeholder: string,
    multiline: boolean,
};

function CustomTextField(props: CustomProps) {
    props = setDefaults(props, {
        multiline: false,
    });

    const classes = useStyles(props);

    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <TextField
                id={props.id}
                type="text"
                placeholder={props.placeholder}
                variant="outlined"
                fullWidth
                InputLabelProps={{shrink: true}}
                multiline={props.multiline}
            />
        </FormControl>
    );
}

export default CustomTextField;