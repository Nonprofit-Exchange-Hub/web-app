import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FacebookIcon from '@material-ui/icons/Facebook';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import StyledLink from './StyledLink';

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
            margin: 'auto'
        },
        header: { fontWeight: 'bold', marginBottom: 68 },
        button: {
            borderRadius: 0,
            height: 62,
            textTransform: 'none'
        },
        link: {
            color: 'black'
        },
        input: {
            height: 62,
            border: '1px solid #C4C4C4',
            boxSizing: 'border-box',
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontSize: 18,
            marginBottom: 20
        },
        label: {
            color: '#000000',
            textAlign: 'left'
        },
        separator: {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            '&::before': {
                content: '""',
                flex: 1,
                borderBottom: '1px solid #C4C4C4'
            },
            '&::after': {
                content: '""',
                flex: 1,
                borderBottom: '1px solid #C4C4C4'
            },
            '&:not(:empty)::before': {
                marginRight: '.5em'
            },
            '&:not(:empty)::after': {
                marginLeft: '.5em'
            }
        }
    };
});

function Login() {
    const classes = useStyles();

    interface UserLoginData {
        email: string;
        password: string;
    }

    const initialFormData: UserLoginData = {
        email: '',
        password: ''
    };

    const [ formData, setFormData ] = React.useState(initialFormData);
    const [ showPassword, setShowPassword ] = React.useState(false);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value }: { name: string; value: string } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value
        }));
    };

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        console.debug('handleSubmit - formData: ', formData);
        try {
            const res = await window.fetch('http://localhost:3001/api/user');
            console.debug('handleSubmit - res', res);
        } catch (error) {
            console.debug('handleSubmit - err', error);
        }
    };

    const googleSignIn = (evt: React.MouseEvent) => {
        console.debug('googleSignIn - evt.currentTarget:', evt.currentTarget);
    };

    const facebookSignIn = (evt: React.MouseEvent) => {
        console.debug('facebookSignIn - evt.currentTarget:', evt.currentTarget);
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
                        <Button className={classes.button} variant="outlined" onClick={googleSignIn}>
                            Sign In with Google
                        </Button>
                        <Button
                            className={classes.button}
                            startIcon={<FacebookIcon />}
                            onClick={facebookSignIn}
                            style={{ backgroundColor: '#1877F2', color: 'white' }}
                        >
                            Sign In with Facebook
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.separator}>
                            <Typography variant="h6" component="span" align="center" style={{ color: '#C4C4C4' }}>
                                or
                            </Typography>
                        </div>
                    </Grid>
                    <Grid container item xs={12}>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <FormControl fullWidth>
                                <label className={classes.label} htmlFor="email">
                                    Email Address
                                </label>

                                <Input
                                    className={classes.input}
                                    type="text"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="jane@nonprofit.com"
                                    fullWidth
                                    value={formData.email}
                                    onChange={handleChange}
                                    disableUnderline
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <label className={classes.label} htmlFor="password">
                                        Password
                                    </label>
                                    <StyledLink to="/forgot_password">Forgot Password?</StyledLink>
                                </div>
                                <Input
                                    className={classes.input}
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    disableUnderline
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
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
