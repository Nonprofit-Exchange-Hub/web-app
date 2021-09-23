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
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
};

function CustomTextField(props: CustomProps) {
    return (
        <FormControl component="fieldset">
            <FormLabel>{props.label}</FormLabel>
            <RadioGroup
                name={props.id}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => {
                    return  <FormControlLabel key={`form-control-${index}`} value={option.value} control={<Radio />} label={option.text} />
                })}
            </RadioGroup>
        </FormControl>
    );
}

export default CustomTextField;