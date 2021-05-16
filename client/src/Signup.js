import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  Link
} from "react-router-dom";

function Signup() {
	return (
		<>
			<div>Welcome!</div>
			<div>Select your account type.</div>
			<div>Already have an account? <Link to="/login">Log In</Link></div>
			<div>
				<span>Are you a non-profit organization?</span>
				<Link to="/signup_nonprofit">
					<button>Create non-profit account</button>
				</Link>
			</div>
			<div>
				<span>Are you an individual citizen?</span>
				<Link to="/signup_citizen">
					<button>Create citizen account</button>
				</Link>
			</div>
		</>
	);
}

export default Signup;
