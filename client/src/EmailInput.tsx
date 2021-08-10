import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import type { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => {
    return {
        input: {
            height: 62,
            border: '1px solid #C4C4C4',
            boxSizing: 'border-box',
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontSize: 18,
            marginBottom: 20,
        },
        label: {
            color: '#000000',
            textAlign: 'left',
        },
    };
});
interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder: string;
    startAdornment?: boolean;
}

function EmailInput({ onChange, value, placeholder, startAdornment = false }: Props) {
    const classes = useStyles();

    return (
        <FormControl fullWidth>
            <label className={classes.label} htmlFor="email">
                Email Address
            </label>
            <Input
                className={classes.input}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder={placeholder}
                fullWidth
                value={value}
                onChange={onChange}
                disableUnderline
                required
                startAdornment={
                    startAdornment && (
                        <InputAdornment position="start">
                            <MailOutlineIcon />
                        </InputAdornment>
                    )
                }
            />
        </FormControl>
    );
}

export default EmailInput;
