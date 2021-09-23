import * as React from 'react';
import { TextField, FormControl, FormLabel } from '@material-ui/core';

type CustomProps = {
    id: string,
    label: string,
    placeholder: string,
    multiline: boolean,
    value: string,
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
};

function CustomTextField({label, id, placeholder, multiline = false, value, onChange}: CustomProps) {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <TextField
                id={id}
                name={id}
                type="text"
                placeholder={placeholder}
                variant="outlined"
                fullWidth
                InputLabelProps={{shrink: true}}
                multiline={multiline}
                value={value}
                onChange={onChange}
            />
        </FormControl>
    );
}

export default CustomTextField;