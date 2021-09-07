import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import type { Theme } from '@material-ui/core/styles';

import EmailInput from './EmailInput';
import FacebookAuthBtn from './FacebookAuthBtn';
import GoogleAuthBtn from './GoogleAuthBtn';
import PasswordInput from './PasswordInput';
import StyledLink from './StyledLink';
import TextDivider from './TextDivider';
import { UserContext } from './providers';


const useStyles = makeStyles((theme: Theme) => {
    const xPadding = 12;
    const yPadding = 6;
    const yMargin = 8;

    return {
        paper: {
            maxWidth: 821 - theme.spacing(xPadding),
            maxHeight: 732 - theme.spacing(yPadding),
            borderRadius: 10,
            marginTop: theme.spacing(yMargin),
            marginBottom: theme.spacing(yMargin),
            paddingTop: theme.spacing(yPadding),
            paddingBottom: theme.spacing(yPadding),
            paddingLeft: theme.spacing(xPadding),
            paddingRight: theme.spacing(xPadding),
            margin: 'auto',
        },
        header: { fontWeight: 'bold', marginBottom: 68 },
        button: {
            borderRadius: 0,
            height: 62,
            textTransform: 'none',
        },
    };
});

interface UserLoginData {
    email: string;
    password: string;
}

const initialFormData: UserLoginData = {
    email: '',
    password: '',
};
function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [, setUser] = React.useContext(UserContext);

    const [ formData, setFormData ] = React.useState(initialFormData);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value }: { name: string; value: string } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const response = await res.json();
            // TODO replace placeholder with .env var
            const user = jwt.verify(response.access_token, 'placeholder');
            setUser(user);
            history.push('/');
        } catch (err) {
            // Handle error
        }
    };

    return (
        <div className="Login" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container justify="center" direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Typography className={classes.header} variant="h3" component="h1" align="center">
                            Welcome Back.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container justify="space-between">
                        <GoogleAuthBtn>Sign In with Google</GoogleAuthBtn>
                        <FacebookAuthBtn>Sign In with Facebook</FacebookAuthBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <TextDivider>or</TextDivider>
                    </Grid>
                    <Grid container item xs={12}>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <EmailInput
                                value={formData.email}
                                placeholder="jane@nonprofit.com"
                                onChange={handleChange}
                            />
                            <PasswordInput value={formData.password} onChange={handleChange} showForgot={true} />
                            <Button
                                className={classes.button}
                                style={{ backgroundColor: '#C4C4C4', color: 'white' }}
                                fullWidth
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="left">
                            Not signed up yet? <StyledLink to="/signup">Sign Up</StyledLink>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Login;
