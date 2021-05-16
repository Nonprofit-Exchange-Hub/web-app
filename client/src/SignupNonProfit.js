import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function SignupNonProfit() {
	const INITIAL_FORM_DATA = {
		org_name: '',
		city: '',
		state: '',
		ein: '',
		tax_exempt_id: '',
		nonprofit_classification: '',
		first_name: '',
		last_name: '',
		role_or_title: '',
		email: '',
		password: '',
		accept_terms: false
	};
	const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);
	const [ pageNum, setPageNum ] = useState(1);
	const handleFieldChange = ({ target }) => {
		const { name, value } = target;
		setFormData((fData) => {
			return {
				...fData,
				[name] : target.type === 'checkbox' ? target.checked : value
			}
		});
	};
	const handleNextClick = () => setPageNum(2);
	const handleSignupClick = () => {
		console.log('signup clicked', formData);
	}

	return (
		<>
			<div>Let's Get Started.</div>
			<div>Already have an account? <a>Log In</a></div>
			{pageNum === 1 
				?
				<>
					<div>Step 1: About your organization</div>

					<div>
						<span>Organization Name</span>
					</div>
					<div>
						<input type="text" 
							name="org_name" 
							value={formData.org_name}
							onChange={e => {handleFieldChange(e)}}
					 	/>
					</div>
					<div>
						<span>City</span>
					</div>
					<div>
						<input type="text" 
							name="city"
							value={formData.city}
							onChange={e => {handleFieldChange(e)}}
						/>
					</div>
					<div>
						<span>State</span>
					</div>
					<div>
						<input type="text" 
							name="state"
							value={formData.state}
							onChange={e => {handleFieldChange(e)}}
						/>
					</div>

					<div>
						<span>Entity Identification Number (EIN)</span>
					</div>
					<div>
						<input type="text" 
							name="ein"
							value={formData.ein}
							onChange={e => {handleFieldChange(e)}}
						/>
					</div>
					<div>
						<span>Tax Exempt ID #</span>
					</div>
					<div>
						<input type="text" 
							name="tax_exempt_id" 
							value={formData.tax_exempt_id}
							onChange={e => {handleFieldChange(e)}}
						/>
					</div>
					<div>
						<span>IRS Nonprofit Organization Classification</span>
					</div>
					<div>
						<select name="nonprofit_classification"
							value={formData.nonprofit_classification}
							onChange={e => {handleFieldChange(e)}}
						>
							<option value="" />
						</select>
					</div>

					<div>
						<button onClick={e => handleNextClick(e)}>Next</button>
					</div>
				</>
				:
				<>
					<div>Step 2: About You</div>

					<div>
						<span>First Name</span>
						<span>Last Name</span>
					</div>
					<div>
						<input type="text" 
							name="first_name" 
							value={formData.first_name}
							onChange={e => {handleFieldChange(e)}}
					 	/>
						<input type="text" 
							name="last_name" 
							value={formData.last_name}
							onChange={e => {handleFieldChange(e)}}
					 	/>
					</div>

					<div>
						<span>Role / Title</span>
					</div>
					<div>
						<input type="text" 
							name="role_or_title" 
							value={formData.role_or_title}
							onChange={e => {handleFieldChange(e)}}
					 	/>
					</div>

					<div>
						<span>Email Address</span>
					</div>
					<div>
						<input type="text" 
							name="email" 
							value={formData.email}
							onChange={e => {handleFieldChange(e)}}
					 	/>
					</div>

					<div>
						<span>Password (6 or more characters)</span>
					</div>
					<div>
						<input type="text" 
							name="password" 
							value={formData.password}
							onChange={e => {handleFieldChange(e)}}
					 	/>
					</div>

					<div>
						<input type="checkbox" name="accept_terms" id="accept_terms" 
							value={formData.accept_terms}
							onChange={e => {handleFieldChange(e)}}
						/>
						<label htmlFor="accept_terms">Accept the <a>Terms and Agreements</a></label>
					</div>
					<div>
						<button onClick={handleSignupClick}>Sign Up</button>
					</div>
				</>
			}
		</>
	);
}

export default SignupNonProfit;
