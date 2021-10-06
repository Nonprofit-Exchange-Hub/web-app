import * as React from 'react';
import { OutlinedInput, MenuItem, FormControl, FormLabel } from '@material-ui/core';
import { Select as MUISelect } from '@material-ui/core';

type CustomProps = {
    id: string,
    label: string,
    placeholder: string,
    options: {
        value: string,
        text: string
    }[],
    value: string,
    onChange: (event: any) => void,
};

const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
    let { name = '', value }: { name?: string | undefined; value: unknown } = event.target;
    // console.log(event.target.value);
};

function Select({id, label, placeholder, options, value, onChange}: CustomProps) {

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MUISelect
                name={id}
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
                value={value}
                renderValue={(value: any) => {
                    if (value.length === 0) {
                        return <em>{placeholder}</em>;
                    }
                    return value;
                    }}
                onChange={onChange}
            >
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option, index) => {
                    return  <MenuItem key={option.text} value={option.text}>{option.text}</MenuItem>
                })}
            </MUISelect>
        </FormControl>
    );
}

export default Select;