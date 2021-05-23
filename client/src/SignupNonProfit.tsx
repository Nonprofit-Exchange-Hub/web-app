import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function SignupNonProfit() {
    interface SignupData {
        org_name: string;
        city: string;
        state: string;
        ein: string;
        tax_exempt_id: string;
        nonprofit_classification: string;
        first_name: string;
        last_name: string;
        role_or_title: string;
        email: string;
        password: string;
        accept_terms: string;
    }

    const initialFormData: SignupData = {
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
        accept_terms: 'false'
    };

    const [ formData, setFormData ] = React.useState(initialFormData);
    const [ pageNum, setPageNum ] = React.useState(1);

    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = evt.target;

        setFormData((fData) => {
            return {
                ...fData,
                [name]: type === 'checkbox' ? evt.target.checked : value
            };
        });
    };

    //Had to make second handler for HTMLSelectElement vs HTMLInputElement
    //checked property does not exist on HTMLSelectElement, and so general handler does not work.
    const handleSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = evt.target;

        setFormData((fData) => {
            return {
                ...fData,
                [name]: value
            };
        });
    };

    const handleNextClick = () => setPageNum(2);
    const handleSignupClick = () => {
        console.log('signup clicked', formData);
    };

    return (
        <React.Fragment>
            <div>Let's Get Started.</div>
            <div>
                Already have an account? <a>Log In</a>
            </div>
            {pageNum === 1 ? (
                <div>
                    <div>Step 1: About your organization</div>

                    <div>
                        <span>Organization Name</span>
                    </div>
                    <div>
                        <input type="text" name="org_name" value={formData.org_name} onChange={handleFieldChange} />
                    </div>
                    <div>
                        <span>City</span>
                    </div>
                    <div>
                        <input type="text" name="city" value={formData.city} onChange={handleFieldChange} />
                    </div>
                    <div>
                        <span>State</span>
                    </div>
                    <div>
                        <input type="text" name="state" value={formData.state} onChange={handleFieldChange} />
                    </div>

                    <div>
                        <span>Entity Identification Number (EIN)</span>
                    </div>
                    <div>
                        <input type="text" name="ein" value={formData.ein} onChange={handleFieldChange} />
                    </div>
                    <div>
                        <span>Tax Exempt ID #</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="tax_exempt_id"
                            value={formData.tax_exempt_id}
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div>
                        <span>IRS Nonprofit Organization Classification</span>
                    </div>
                    <div>
                        <select
                            name="nonprofit_classification"
                            value={formData.nonprofit_classification}
                            onChange={handleSelectChange}
                        >
                            <option value="" />
                        </select>
                    </div>

                    <div>
                        <button onClick={handleNextClick}>Next</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div>Step 2: About You</div>

                    <div>
                        <span>First Name</span>
                        <span>Last Name</span>
                    </div>
                    <div>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleFieldChange} />
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleFieldChange} />
                    </div>

                    <div>
                        <span>Role / Title</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="role_or_title"
                            value={formData.role_or_title}
                            onChange={handleFieldChange}
                        />
                    </div>

                    <div>
                        <span>Email Address</span>
                    </div>
                    <div>
                        <input type="text" name="email" value={formData.email} onChange={handleFieldChange} />
                    </div>

                    <div>
                        <span>Password (6 or more characters)</span>
                    </div>
                    <div>
                        <input type="text" name="password" value={formData.password} onChange={handleFieldChange} />
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="accept_terms"
                            id="accept_terms"
                            value={formData.accept_terms}
                            onChange={handleFieldChange}
                        />
                        <label htmlFor="accept_terms">
                            Accept the <a>Terms and Agreements</a>
                        </label>
                    </div>
                    <div>
                        <button onClick={handleSignupClick}>Sign Up</button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default SignupNonProfit;
