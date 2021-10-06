import * as React from 'react';
import { Select, OutlinedInput, MenuItem, FormControl, FormLabel } from '@material-ui/core';

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

const handleChange = (event: any): void => {
    const { name, value }: { name: string; value: string } = event.target;

};

function CustomSelect({id, label, placeholder, options, value, onChange}: CustomProps) {

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Select
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
                    return  <MenuItem key={`select-control-${index}`} value={option.text}>{option.text}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default CustomSelect;