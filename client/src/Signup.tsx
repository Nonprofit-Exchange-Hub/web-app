import * as React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <React.Fragment>
            <div>Welcome!</div>
            <div>Select your account type.</div>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
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
        </React.Fragment>
    );
}

export default Signup;
