import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function SignupCitizen() {
    return (
        <React.Fragment>
            <div>Let's Get Started.</div>
            <div>
                Already have an account? <a>Log In</a>
            </div>
            <div>
                <button>Sign Up With Google</button>
                <button>Sign Up With Facebook</button>
            </div>
            <div>or</div>
            <div>
                <span>First Name</span>
                <span>Last Name</span>
            </div>
            <div>
                <input type="text" name="first_name" />
                <input type="text" name="last_name" />
            </div>
            <div>
                <span>Email Address</span>
            </div>
            <div>
                <input type="text" name="email" />
            </div>
            <div>
                <span>Password (6 or more characters)</span>
            </div>
            <div>
                <input type="text" name="password" />
            </div>
            <div>
                <input type="checkbox" name="accept_terms" id="accept_terms" />
                <label htmlFor="accept_terms">
                    Accept the <a>Terms and Agreements</a>
                </label>
            </div>
            <div>
                <button>Sign Up</button>
            </div>
        </React.Fragment>
    );
}

export default SignupCitizen;
