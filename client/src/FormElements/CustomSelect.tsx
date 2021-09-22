import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import { Select, OutlinedInput, MenuItem, FormControl, FormLabel } from '@material-ui/core';
import { setDefaults } from '../Helpers';
import { formatWithOptions } from 'util';

const useStyles = makeStyles<Theme, CustomProps> ((theme: Theme) => ({
}));

type CustomProps = {
    id: string,
    label: string,
    placeholder: string,
    options: {
        value: string,
        text: string
    }[],
};

function CustomSelect(props: CustomProps) {
    const classes = useStyles(props);

    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <Select
                id={props.id}
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
                    return <em>{props.placeholder}</em>;
                }
                return selected;
                }}
            >
                <MenuItem disabled value="">
                    <em>{props.placeholder}</em>
                </MenuItem>
                {props.options.map((option, index) => {
                    return  <MenuItem key={`select-control-${index}`} value={option.text}>{option.text}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default CustomSelect;