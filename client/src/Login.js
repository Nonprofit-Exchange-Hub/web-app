import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Login() {
	return (
		<div className="Login">
			<header className="Login-header">
				<Paper>
					<Typography variant="h3" component="h1">
						Welcome Back.
					</Typography>
				</Paper>
			</header>
		</div>
	);
}

export default Login;
