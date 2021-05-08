import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
	const xPadding = 6;
	const yPadding = 16;

	return {
		paper  : {
			width         : 821,
			height        : 732,
			borderRadion  : 10,
			paddingTop    : theme.spacing(xPadding),
			paddingBottom : theme.spacing(xPadding),
			paddingLeft   : theme.spacing(yPadding),
			paddingRight  : theme.spacing(yPadding)
		},
		button : {
			borderRadius : 0,
			height       : 62
		},
		link   : {
			color : 'black'
		}
	};
});

function Login() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const INITIAL_FORM_DATA = {
		email    : '',
		password : ''
	};
	const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);
	const [ showPassword, setShowPassword ] = useState(false);

	const handleChange = (evt) => {
		const { name, value } = evt.target;

		setFormData((fData) => ({
			...fData,
			[name] : value
		}));
	};

	// Toggle password visibility
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className="Login">
			<Paper elevation={3} className={classes.paper}>
				<Grid container justify="center" direction="column" spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h3" component="h1" align="center">
							Welcome Back.
						</Typography>
					</Grid>
					<Grid item xs={12} container justify="space-between">
						<Button className={classes.button} variant="outlined">
							Sign In with Google
						</Button>
						<Button
							className={classes.button}
							startIcon={<FacebookIcon />}
							style={{ backgroundColor: '#1877F2', color: 'white' }}
						>
							Sign In with Facebook
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" component="span" align="center" style={{ color: '#C4C4C4' }}>
							or
						</Typography>
					</Grid>
					<Grid item container spacing={3} direction="column">
						<Grid item xs={12}>
							<TextField
								id="email"
								name="email"
								value={formData.email}
								label="Email Address"
								placeholder="jane@nonprofit.com"
								variant="outlined"
								onChange={handleChange}
								fullWidth
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
								<FilledInput
									id="filled-adornment-password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									value={formData.password}
									onChange={handleChange}
									style={{ backgroundColor: 'white', border: '1px #C4C4C4 solid', borderRadius: 0 }}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Button
							className={classes.button}
							style={{ backgroundColor: '#C4C4C4', color: 'white' }}
							fullWidth
						>
							Sign In
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography align="left">
							Not signed up yet?{' '}
							<Link className={classes.link} component={RouterLink} to="/signup">
								Sign Up
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default Login;
