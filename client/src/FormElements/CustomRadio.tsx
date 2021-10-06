import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

type CustomProps = {
    id: string,
    label: string,
    options: {
        value: string,
        text: string
    }[],
    value: string,
    onChange: (event: any) => void,
};

function CustomRadio({id, label, options, value, onChange}: CustomProps) {
    return (
        <FormControl component="fieldset">
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                id={id}
                name={id}
                value={value}
                onChange={onChange}
            >
                {options.map((option, index) => {
                    return  <FormControlLabel key={`form-control-${index}`} value={option.value} control={<Radio />} label={option.text} />
                })}
            </RadioGroup>
        </FormControl>
    );
}

export default CustomRadio;