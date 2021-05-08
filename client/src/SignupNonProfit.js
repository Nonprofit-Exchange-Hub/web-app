import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function SignupNonProfit() {
	const INITIAL_FORM_DATA = {
		email: '',
		password: ''
	};
	const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);
	const handleFieldChange = ({ target }) => {
		const { name, value } = target;
		setFormData((fData) => {
			return {
				...fData,
				[name] : value
			}
		});
	};

	return (
		<>
			<div>Let's Get Started.</div>
			<div>Already have an account? <a>Log In</a></div>

			<div>Step 1: About your oganization</div>

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
				<button>Next</button>
			</div>
		</>
	);
}

export default SignupNonProfit;
