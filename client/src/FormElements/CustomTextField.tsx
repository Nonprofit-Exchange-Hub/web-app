import * as React from 'react';
import { TextField, FormControl, FormLabel } from '@material-ui/core';
import { setDefaults } from '../Helpers';

type CustomProps = {
    id: string,
    label: string,
    placeholder: string,
    multiline: boolean,
    value: string,
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
};

function CustomTextField(props: CustomProps) {
    props = setDefaults(props, {
        multiline: false,
    });

    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <TextField
                id={props.id}
                name={props.id}
                type="text"
                placeholder={props.placeholder}
                variant="outlined"
                fullWidth
                InputLabelProps={{shrink: true}}
                multiline={props.multiline}
                value={props.value}
                onChange={props.onChange}
            />
        </FormControl>
    );
}

export default CustomTextField;